import nodemailer from "nodemailer";

export const QUOTE_RECIPIENT = "vertlhorizon64@gmail.com";

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

export function quoteMessage(id: string, fields: Record<string, string>, photos: Buffer[]) {
  return {
    from: { name: "Vert L’Horizon — demandes de devis", address: process.env.SMTP_FROM || process.env.SMTP_USER || "" },
    to: QUOTE_RECIPIENT,
    replyTo: { name: fields.name, address: fields.email },
    subject: `Nouvelle demande de devis — ${fields.service.replace(/[\r\n]/g, " ")}`,
    text: ["Nouvelle demande depuis le site Vert L’Horizon", `Référence : ${id}`, "", `Nom : ${fields.name}`, `E-mail : ${fields.email}`, `Téléphone : ${fields.phone}`, `Commune : ${fields.town}`, `Prestation : ${fields.service}`, "", fields.description, "", `${photos.length} photo(s) en pièces jointes.`].join("\n"),
    attachments: photos.map((content, index) => ({ filename: `projet-${index + 1}.jpg`, content, contentType: "image/jpeg" })),
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function sendQuote(id: string, fields: Record<string, string>, photos: Buffer[]) {
  const port = Number(process.env.SMTP_PORT || "465");
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  });
  const result = await transport.sendMail(quoteMessage(id, fields, photos));
  if (!result.accepted.some(address => String(address).toLowerCase() === QUOTE_RECIPIENT)) throw new Error("recipient-rejected");
  return result.messageId;
}
