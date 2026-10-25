"use client";

import { createContext, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type FormEvent, type ReactNode } from "react";

import { photoError } from "@/lib/quote-photos";

const QuoteContext = createContext<(() => void) | null>(null);

export function QuoteButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const open = useContext(QuoteContext);
  return <button {...props} type="button" onClick={() => open?.()}>{children}</button>;
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [photoMessage, setPhotoMessage] = useState("");
  const [sending, setSending] = useState(false);
  useEffect(() => {
    const urls = photos.map(file => URL.createObjectURL(file));
    setPreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [photos]);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    photos.forEach(photo => data.append("photos", photo));
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/quote-requests", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "L’envoi a échoué.");
      setStatus(result.message);
      form.reset();
      setPhotos([]);
      setPhotoMessage("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "L’envoi a échoué. Vos informations sont conservées, vous pouvez réessayer.");
    } finally {
      setSending(false);
    }
  }
  return <QuoteContext.Provider value={() => dialog.current?.showModal()}>
    {children}
    <dialog ref={dialog} id="quote-dialog" aria-labelledby="form-title" onClick={event => {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.current?.close();
    }}>
      <button className="close" aria-label="Fermer le formulaire" type="button" onClick={() => dialog.current?.close()}>×</button>
      <p className="eyebrow">ON PARLE DE VOTRE PROJET ?</p>
      <h2 id="form-title">Ça commence ici.</h2>
      <p className="form-intro">Quelques infos pour que Martin puisse préparer votre devis.</p>
    <form id="quote-form" onSubmit={handleSubmit}>
      <fieldset disabled={sending} className="quote-fields">
      <label>Votre besoin<select name="service" required><option value="">Choisir une prestation</option><option>Entretien de jardin</option><option>Taille et débroussaillage</option><option>Aménagement extérieur</option><option>Terrassement et déconstruction</option><option>Évacuation</option><option>Autre projet</option></select></label>
      <div className="form-row"><label>Votre nom<input name="name" autoComplete="name" required maxLength={100} /></label><label>Commune du chantier<input name="town" autoComplete="address-level2" required maxLength={100} /></label></div>
      <div className="form-row"><label>Votre e-mail<input type="email" name="email" autoComplete="email" required maxLength={200} /></label><label>Votre téléphone<input type="tel" name="phone" autoComplete="tel" required maxLength={30} /></label></div>
      <label>Parlez-moi du projet<textarea name="description" rows={4} required maxLength={2000} placeholder="Travaux souhaités, surface approximative, accès au terrain, période envisagée…"></textarea></label>
      <div className="photo-upload">
        <label htmlFor="project-photos">Photos de votre projet <span className="optional">(facultatif)</span></label>
        <p id="photo-help">Montrez le terrain, la haie ou les travaux à réaliser. Jusqu’à 5 photos JPG, PNG ou WebP · 8 Mo par photo · 20 Mo au total.</p>
        <input id="project-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple aria-describedby="photo-help photo-message" onChange={event => {
          const selected = Array.from(event.currentTarget.files ?? []);
          event.currentTarget.value = "";
          if (!selected.length) return;
          const combined = [...photos, ...selected];
          const error = photoError(combined);
          setPhotoMessage(error ?? "");
          if (!error) { setPhotos(combined); setStatus(""); }
        }} />
        <p id="photo-message" role="alert">{photoMessage}</p>
        {photos.length > 0 && <ul className="photo-previews" aria-label="Photos sélectionnées">{photos.map((photo, index) => <li key={`${photo.name}-${index}`}>
          {previews[index] && <img src={previews[index]} alt={`Aperçu : ${photo.name}`} />}
          <span title={photo.name}>{photo.name}</span>
          <button type="button" aria-label={`Retirer ${photo.name}`} onClick={() => { setPhotos(current => current.filter((_, i) => i !== index)); setPhotoMessage(""); }}>Retirer ×</button>
        </li>)}</ul>}
      </div>
      <p className="email-note">Votre demande et vos photos sont destinées à Martin pour préparer votre devis.</p>
      <button className="button primary submit" type="submit" disabled={sending}>{sending ? "Envoi en cours…" : "Envoyer ma demande"} <span aria-hidden="true">↗</span></button>
      </fieldset>
      <p id="form-status" role="status">{status}</p>
    </form>
    </dialog>
  </QuoteContext.Provider>;
}
