import type { ReactNode } from "react";

// Profils officiels transmis par Samuel.
const profiles: { name: string; url: string | null; icon: ReactNode }[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/vert_lhorizon",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@vert.lhorizon.64",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 2h-3v13.4a3.1 3.1 0 1 1-2.7-3.07V9.3a6.1 6.1 0 1 0 5.7 6.1V8.6a8.5 8.5 0 0 0 5 1.6v-3a5 5 0 0 1-5-5.2Z" /></svg>,
  },
];

export function SocialLinks() {
  return <div className="social-links" role="group" aria-label="Réseaux sociaux de Martin">
    {profiles.map(({ name, url, icon }) => url
      ? <a key={name} className="social-icon" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} de Martin (nouvel onglet)`} title={name}>{icon}</a>
      : <button key={name} className="social-icon" type="button" disabled aria-label={`${name} — lien à venir`} title={`${name} — lien à venir`}>{icon}</button>)}
  </div>;
}
