# Vert L’Horizon 64

Projet Next.js avec App Router, React, TypeScript, Tailwind CSS et Geist Sans.

## Démarrer

```sh
npm install
npm run dev
```

Aperçu : http://127.0.0.1:3000/.

```sh
npm run typecheck
npm run build
npm start
```

La compilation de production utilise Webpack (`next build --webpack`) : Turbopack rencontre une restriction de création de processus dans cet environnement. Le serveur de développement utilise Turbopack.

## Arborescence

- `src/app/` : layout, page d’accueil, styles et thème Tailwind.
- `src/components/` : navigation, hero, services, présentation, contact et formulaire React.
- `public/assets/` : logos, images et portrait.
- `DESIGN-SYSTEM.md` : couleurs, typographie et conventions.
- `prompts-images.md` : provenance des illustrations générées.
- `dist/` : ancienne maquette statique conservée comme archive ; elle n’est pas utilisée par Next.js.

## État fonctionnel

Le formulaire transmet désormais la demande et jusqu’à cinq photos à `POST /api/quote-requests`. Stockage de développement privé dans `.data/quote-requests/<uuid>/` : `request.json` et photos JPEG réencodées sans métadonnées. Limites : 8 Mo/photo, 20 Mo au total, JPG/PNG/WebP non animés, 40 mégapixels maximum. Envoi SMTP à `vertlhorizon64@gmail.com` avec les photos réencodées en pièces jointes et l’adresse du demandeur en Reply-To. Le succès signifie que le serveur SMTP a accepté le message, pas une confirmation de lecture ou de réception en boîte principale.

La réception est désactivée en production par défaut (HTTP 503). `ENABLE_LOCAL_QUOTE_STORAGE=true` est réservé à un essai sur serveur avec disque persistant ; ce stockage local ne convient pas à un hébergement serverless. Prévoir stockage durable, notification, protection anti-abus et administration avant publication. Les champs définitifs restent à confirmer avec Martin.

Dépôt dédié : https://github.com/samuelabadie/vert-lhorizon-websitz — initialisé à la demande de Samuel le 2026-10-25.

## Envoi Gmail — 2026-10-25

Renseigner `SMTP_PASSWORD` dans `.env.local` avec le mot de passe d’application du compte Gmail de Martin (validation en deux étapes nécessaire). Les autres variables sont préparées dans `.env.example`. Ne jamais partager ce mot de passe dans le chat ni le versionner. Next recharge le fichier en développement.

Sans identifiants SMTP : HTTP 503 explicite, aucun succès trompeur. Une copie locale de la demande est conservée avant l’envoi ; `email.json` indique `accepted` ou `unconfirmed`. En cas d’envoi non confirmé, contacter Martin avant de réessayer pour éviter un doublon. Aucune relance automatique. Le stockage local exige toujours un disque persistant et le verrou de production reste actif.

Vérifications : contrôle TypeScript et build de production réussis. Le test réel de réception Gmail avec plusieurs photos reste à effectuer après configuration du mot de passe d’application. La préparation ne modifie pas le statut commercial du projet.

## Réseaux sociaux — 2026-10-25

Icônes Instagram et TikTok placées dans la navigation, à côté des CTA devis et appel, sans bordure, dans la palette verte. Profils centralisés dans `src/components/social-links.tsx` : Instagram `https://www.instagram.com/vert_lhorizon` et TikTok `https://www.tiktok.com/@vert.lhorizon.64`, fournis par Samuel. Liens actifs ouverts dans un nouvel onglet avec `noopener noreferrer`.

## Réalisations — 2026-10-25

Section `#realisations` entre les prestations et Martin, liée depuis la navigation. Grille de quatre emplacements avant/après, deux colonnes sur ordinateur, une sur mobile. Badges verts pour le jardin et jaunes pour les travaux. Photos attendues : aucune réalisation fictive illustrée. Les tags de maquette doivent être confirmés avec chaque paire de photos ; données centralisées dans `src/components/projects.tsx`.

## Préparation Render — 2026-10-25

Commande `start:render` ajoutée, répertoire de stockage configurable par `QUOTE_STORAGE_DIR` et origine publique par `SITE_URL`. Configuration et étapes restantes dans `DEPLOYMENT.md`. Aucun déploiement, DNS ou changement Git effectué. Décisions en attente : plan Render et compte/dépôt dédié.

## Publication du code — 2026-10-25

Premier envoi demandé sur le dépôt dédié, branche `main`. Sources, assets publics et documentation inclus ; secrets, demandes clients, dépendances, builds et ancienne maquette exclus. Compilation de production et TypeScript vérifiés avant publication. Prochaine étape : adapter le formulaire à l’hébergement choisi (Netlify proposé), puis déployer et relier OVH.
