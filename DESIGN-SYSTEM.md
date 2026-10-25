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
- Hero centré, grande photo réelle à découpe polygonale, cadrée sur Martin et sa remorque ; aucun texte sur l’image.
- Navigation avec logo, accès aux sections, demande de devis et appel direct.
- Services : jardin sur fond vert vif, travaux sur fond jaune.
- Fenêtre de devis native `dialog`, fermeture au clavier et par bouton.

Le hero utilise la photo réelle IMG_0531 fournie par Samuel. Les variantes générées sont conservées mais ne sont plus affichées. Le portrait de la section de présentation est également une photo fournie.
