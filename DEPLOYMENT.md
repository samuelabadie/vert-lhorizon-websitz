# Déploiement Render / OVH

Préparation du 2026-10-25. Aucun service créé, aucun DNS modifié, aucune opération Git exécutée.

## Source

Le dossier site appartient actuellement au dépôt Lobby, sans remote configuré. Prévoir un dépôt privé dédié ne contenant que les sources du site, après validation Git explicite. Ne pas publier le Lobby. Exclure `.env.local`, `.data/`, `node_modules/`, `.next/` et les fichiers de tests ; conserver `.env.example`. Le dossier `dist/` est une ancienne maquette inutile au déploiement.

## Render : configuration pour conserver Gmail et les demandes

- Type : Web Service, runtime Node, région Frankfurt.
- Root Directory : racine du futur dépôt dédié.
- Build Command : `npm ci --include=dev && npm run build`.
- Start Command : `npm run start:render` (écoute sur 0.0.0.0 et PORT fourni par Render).
- Version Node : 22 LTS à définir dans NODE_VERSION.
- Instance payante et disque persistant, coût à valider dans le dashboard avant création.
- Disque monté sur `/var/data`.
- Variables : `NODE_ENV=production`, `SITE_URL=https://vert-lhorizon.fr`, `ENABLE_LOCAL_QUOTE_STORAGE=true`, `QUOTE_STORAGE_DIR=/var/data/quote-requests`.
- SMTP : `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=vertlhorizon64@gmail.com`, `SMTP_FROM=vertlhorizon64@gmail.com`. Renseigner SMTP_PASSWORD en secret dans Render, jamais dans Git.

Le mode gratuit bloque les ports SMTP 465/587 et ne permet pas le disque persistant. Il nécessite une autre architecture d’envoi et de stockage ; ne pas simplement activer le formulaire sur son disque éphémère.

## Domaine OVH

1. Déployer et vérifier l’URL Render attribuée.
2. Ajouter `vert-lhorizon.fr` dans Settings > Custom Domains. Render ajoute également www avec redirection vers le domaine racine.
3. Lire et conserver un relevé de la zone OVH actuelle avant modification. Appliquer les cibles A/CNAME indiquées par Render, uniquement pour le domaine web et www. Préserver les MX/TXT de messagerie et les autres sous-domaines. Contrôler les éventuels AAAA incompatibles avant toute modification.
4. Vérifier le domaine et le certificat HTTPS dans Render.
5. Faire un test du formulaire depuis le domaine canonique avec plusieurs photos, confirmer la réception dans Gmail, puis vérifier que la copie persiste après redémarrage.

## Avant publication

- Choisir le plan, le compte Render et le dépôt dédié ; valider séparément les opérations Git.
- Ajouter une protection anti-abus au formulaire public.
- Les réalisations sont encore des emplacements de maquette : intégrer les vraies photos ou masquer cette section pour la publication.
- Configuration HTTPS/DNS et test réel de production restent à effectuer.

Références : https://render.com/docs/deploy-nextjs-app ; https://render.com/docs/free ; https://render.com/docs/disks ; https://render.com/docs/custom-domains
