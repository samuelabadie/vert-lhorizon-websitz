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

**Hébergement Netlify (2026-10-25)** : la configuration `netlify.toml` active `NEXT_PUBLIC_QUOTE_PROVIDER=netlify` au build. Le formulaire envoie les champs et photos à Netlify Forms via `/__forms.html`, déclaré dans `public/__forms.html`. Limite actuelle : cinq photos JPG/PNG/WebP, 7,5 Mo de photos au total pour rester sous 8 Mo par requête. Les fichiers sont transmis directement à Netlify ; le réencodage SMTP décrit ci-dessous ne s'applique pas à ce mode.

Dans Netlify, activer **Forms > Enable form detection** avant le déploiement, puis vérifier la présence du formulaire `demande-de-devis`. Configurer **Forms > Submission notifications > Add notification > Email notification**, destinataire `vertlhorizon64@gmail.com`. Les notifications contiennent des liens vers les photos. Aucun mot de passe SMTP n'est nécessaire dans ce mode. L'enregistrement d'une demande ne garantit pas sa réception par e-mail : un test réel reste nécessaire après activation de la notification.

**Mode local / serveur avec disque persistant (historique SMTP)** : les paragraphes suivants décrivent ce chemin alternatif. La limite de photos actuelle est de 7,5 Mo au total, remplaçant les 20 Mo initiaux.

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

## Hero — 2026-10-25

Deux visuels générés remplacés par des scènes sans Martin, intervenants anonymes de dos et couleurs naturelles moins saturées. Découpes polygonales conservées, originaux archivés dans les assets existants. Prompts et provenance dans `prompts-images.md`. Modification locale, non poussée sur GitHub.

### Hero unique — 2026-10-25

Les deux images superposées sont remplacées par un grand jardin central sans personnage : moitié sauvage / moitié entretenue, arbre, outils et mini-pelle. Image affichée intégralement sur ordinateur et mobile pour conserver les éléments de la scène. Asset et prompt documentés dans `prompts-images.md`. Modification locale ; pas de nouveau commit ni push.

### Favicon — 2026-10-25

SVG fourni par Samuel intégré sans modification dans `src/app/icon.svg`, selon la convention de métadonnées Next.js. Source conservée dans `../../imgs/favicon.svg`. XML validé.

### Photo réelle du hero — 2026-10-25

Photo fournie IMG_0531 intégrée dans `public/assets/hero-chantier-martin.png`. Recadrage CSS sur le bas (Martin et remorque), ratio 5/4 et masque polygonal inspiré de la DA. Original conservé, aucune retouche générative. Modifications locales non poussées.

### Synchronisation GitHub — 2026-10-25

Envoi demandé par Samuel de la photo réelle du hero, du masque polygonal, du favicon et des variantes générées conservées. Les mentions « non poussé » ci-dessus décrivent les étapes précédentes. DNS : la zone OVH et le résolveur 1.1.1.1 indiquent 75.2.60.5 pour le domaine racine ; le cache local conserve encore 213.186.33.5, qui redirige vers www tandis que Netlify redirige www vers le domaine racine. Propagation et certificat HTTPS à revérifier.

### Facebook — 2026-10-25

Icône Facebook ajoutée dans la navigation avec Instagram et TikTok. Page fournie : `https://www.facebook.com/people/Vert-lhorizon-64/61593692201768/` (paramètres de partage retirés). Ouverture dans un nouvel onglet. Réseaux sur une ligne dédiée sur mobile pour préserver les CTA. Contrôle TypeScript réussi ; modification locale non poussée.

### Vérification Netlify et préparation du push — 2026-10-25

Samuel confirme la mise en ligne sur Netlify et demande l'envoi des dernières modifications. Vérifications : domaine HTTPS accessible avec réponse 200 de Netlify ; `/__forms.html` retourne encore 404 avant le push ; build de production avec `NEXT_PUBLIC_QUOTE_PROVIDER=netlify` réussi, TypeScript inclus. Adaptation Netlify Forms et Facebook regroupés pour publication sur `origin/main`. Prochaine action : vérifier la détection du formulaire après déploiement, configurer la notification et confirmer une réception réelle avec Martin. Aucun devis test envoyé pendant cette vérification.
