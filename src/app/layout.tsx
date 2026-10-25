import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vert-lhorizon.fr"),
  title: "Vert l’Horizon 64 — Entretien de jardins & terrassement",
  description: "Entretien de jardins, aménagement et terrassement dans les Pyrénées-Atlantiques. Contactez Martin pour votre projet.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className={GeistSans.variable}><body className="font-sans antialiased bg-cream text-ink">{children}</body></html>;
}
