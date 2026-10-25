# Design system — Vert L’Horizon 64

## Typographie

**Geist Sans**, chargée localement via `geist/font/sans` (intégration `next/font`). Classe Tailwind `font-sans`. Titres gras, interlettrage resserré ; H1 entièrement noir.

## Couleurs

| Token Tailwind | Couleur | Usage |
|---|---|---|
| `cream` | `#FEFFEA` | Fond principal |
| `ink` | `#0E110D` | Texte et boutons sombres |
| `green` | `#125A04` | Vert profond, sections et accents |
| `lime` | `#96FF5D` | Espaces verts, CTA principal |
| `works` | `#FFC530` | Travaux et terrassement |
| `line` | `#D4D8C4` | Séparateurs |

Les valeurs sont centralisées dans `src/app/globals.css` avec `@theme`. Utilisation : `bg-works`, `text-ink`, `bg-lime`, `font-sans`. Les variables historiques de mise en page pointent vers ces mêmes tokens.

## Composants

- Boutons sans bordure, rayon `rounded-button` (5 px), focus clavier visible.
- Panneaux avec rayon `rounded-panel` (8 px).
- Hero centré, deux photos à découpe polygonale qui se chevauchent, aucun texte sur les images.
- Navigation avec logo, accès aux sections, demande de devis et appel direct.
- Services : jardin sur fond vert vif, travaux sur fond jaune.
- Fenêtre de devis native `dialog`, fermeture au clavier et par bouton.

Les photos de chantier du hero sont générées à partir de la référence de Martin. Son portrait dans la section de présentation est la photo fournie.
