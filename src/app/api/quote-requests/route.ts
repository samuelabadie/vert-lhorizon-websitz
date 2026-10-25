import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { mailConfigured, sendQuote } from "@/lib/quote-mail";
import { MAX_TOTAL_BYTES, photoError } from "@/lib/quote-photos";

export const runtime = "nodejs";
const MAX_BODY = MAX_TOTAL_BYTES + 256 * 1024;

export async function POST(request: Request) {
  // Local storage still requires a persistent disk in production.
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_LOCAL_QUOTE_STORAGE !== "true") {
    return Response.json({ error: "La réception des demandes n’est pas encore disponible. Appelez Martin au 06 69 11 14 24." }, { status: 503 });
  }
  if (!mailConfigured()) return Response.json({ error: "L’envoi par e-mail n’est pas encore configuré. Votre demande n’a pas été envoyée ; appelez Martin au 06 69 11 14 24." }, { status: 503 });
  const storageRoot = process.env.QUOTE_STORAGE_DIR || path.join(process.cwd(), ".data", "quote-requests");
  if (process.env.NODE_ENV === "production" && (!process.env.QUOTE_STORAGE_DIR || !path.isAbsolute(storageRoot) || !process.env.SITE_URL)) {
    return Response.json({ error: "La réception des demandes n’est pas encore disponible. Appelez Martin au 06 69 11 14 24." }, { status: 503 });
  }
  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(request.url).origin;
  if (origin && origin !== expectedOrigin) return Response.json({ error: "Origine de la demande non autorisée." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return Response.json({ error: "Format de demande invalide." }, { status: 400 });

  let form: FormData;
  try {
    if (Number(request.headers.get("content-length")) > MAX_BODY) throw new Error("size");
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: "Demande vide." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); throw new Error("size"); }
      chunks.push(value);
    }
    form = await new Response(Buffer.concat(chunks), { headers: { "content-type": request.headers.get("content-type")! } }).formData();
  } catch (error) {
    const oversized = error instanceof Error && error.message === "size";
    return Response.json({ error: oversized ? "La demande dépasse 20 Mo de photos." : "Impossible de lire la demande." }, { status: oversized ? 413 : 400 });
  }

  const limits = { service: 100, name: 100, town: 100, email: 200, phone: 30, description: 2000 };
  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = form.get(key);
    if (typeof value !== "string" || !value.trim() || value.length > max) return Response.json({ error: "Complétez les champs du formulaire correctement." }, { status: 400 });
    fields[key] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return Response.json({ error: "Vérifiez votre adresse e-mail." }, { status: 400 });
  const entries = form.getAll("photos");
  if (entries.some(value => typeof value === "string")) return Response.json({ error: "Photos invalides." }, { status: 400 });
  const photos = entries as File[];
  const error = photoError(photos);
  if (error) return Response.json({ error }, { status: 400 });

  const converted: Buffer[] = [];
  try {
    for (const photo of photos) {
      const input = Buffer.from(await photo.arrayBuffer());
      const image = sharp(input, { limitInputPixels: 40_000_000, failOn: "error" });
      const metadata = await image.metadata();
      if (!["jpeg", "png", "webp"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) throw new Error("format");
      converted.push(await image.rotate().resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer());
    }
  } catch {
    return Response.json({ error: "Une photo est illisible ou non prise en charge. Utilisez une image JPG, PNG ou WebP non animée." }, { status: 400 });
  }
  const id = randomUUID();
  const folder = path.join(storageRoot, id);
  try {
    await mkdir(folder, { recursive: true, mode: 0o700 });
    for (const [index, bytes] of converted.entries()) await writeFile(path.join(folder, `photo-${index + 1}.jpg`), bytes, { mode: 0o600 });
    // Write the manifest last: only complete requests have request.json.
    await writeFile(path.join(folder, "request.json"), JSON.stringify({ id, createdAt: new Date().toISOString(), ...fields, photos: converted.map((_, i) => `photo-${i + 1}.jpg`) }, null, 2), { mode: 0o600 });

  } catch {
    return Response.json({ error: "L’enregistrement a échoué. Réessayez ou appelez Martin." }, { status: 500 });
  }
  try {
    const messageId = await sendQuote(id, fields, converted);
    // Delivery tracking must not turn an accepted email into a failure response.
    await writeFile(path.join(folder, "email.json"), JSON.stringify({ status: "accepted", messageId, acceptedAt: new Date().toISOString() }), { mode: 0o600 }).catch(() => {});
    return Response.json({ id, photoCount: converted.length, message: "Votre demande et vos photos ont été transmises par e-mail à Martin." }, { status: 201 });
  } catch {
    await writeFile(path.join(folder, "email.json"), JSON.stringify({ status: "unconfirmed", attemptedAt: new Date().toISOString() }), { mode: 0o600 }).catch(() => {});
    return Response.json({ error: `L’envoi à Martin n’a pas pu être confirmé. Une copie est conservée (référence ${id}). Appelez Martin avant de renouveler la demande.` }, { status: 502 });
  }
}
