# FriRSS website

Site de présentation de [FriRSS](https://github.com/Fripix/Frirss), publié sur **https://frirss-site.fripix.ch**. Dépôt distinct de l’application : le code de FriRSS n’y est que lu (`npm run sync:check`).

## Démarrer

Node.js **24 LTS** (voir `.nvmrc`), npm. Toutes les dépendances sont locales.

```sh
npm ci
npm run dev
```

Ouvrir **http://localhost:4321/fr/** ou **http://localhost:4321/en/**. L’adresse effectivement liée est `127.0.0.1`, sans exposition au réseau local. `/` mène explicitement à l’anglais ; aucune géolocalisation.

```sh
npm run build
npm run preview -- --port 4322
```

Le build de production est alors accessible sur http://127.0.0.1:4322/fr/. Aucun backend n’est nécessaire. Pour un port occupé : `npm run dev -- --port 4323`.

Astro 7 peut lancer le serveur en arrière-plan dans un environnement d’agent : `npx astro dev status`, `npx astro dev logs`, `npx astro dev stop` ; mêmes sous-commandes pour `preview`. Les tests utilisent `--ignore-lock` pour conserver un processus contrôlé par Playwright.

## Commandes de qualité

```sh
npm run check                 # TypeScript/Astro, ESLint, i18n, Prettier
npm run test:unit             # garde analytics et validateur de traductions
npm run build                # build + vérification des liens internes/métadonnées
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npx playwright install chromium webkit
npm test                     # build de production déjà généré ; lance le port 4322 si besoin
npm run test:performance      # Lighthouse ; preview sur 4322 déjà lancé
npm run social:images         # cartes de partage depuis le hero ; preview sur 4322 déjà lancé
```

`npm run format` applique le formatage. Playwright produit `playwright-report/`, les diagnostics d’échec dans `test-results/`, les captures dans `reports/`. Lighthouse écrit les rapports HTML/JSON et `reports/performance-summary.json`. Les fichiers de diagnostic volumineux sont ignorés par Git. Voir [le rapport QA](docs/QA.md) pour les résultats réellement obtenus et leurs limites.

## Architecture

- **Astro 7**, sortie statique ; TypeScript strict, CSS original avec variables communes (`src/styles/system.css`).
- Aucun React, aucun framework CSS, aucune bibliothèque d’animation, aucun CMS ni base de données.
- Deux polices variables locales (Mona Sans pour les titres, Hanken Grotesk pour le texte), plus Open Sans pour le seul rendu de FreshRSS dans le comparateur ; logo optimisé en WebP par Astro ; l’interface FriRSS est reproduite en HTML, sans capture.
- Interactions natives : `<details>` pour FAQ/langue, JavaScript limité aux contrôles.
- `src/config/site.ts` : liens officiels, version produit vérifiée et champs légaux.
- `src/config/installation.ts` : commandes documentaires, jamais exécutées par le site.
- `src/config/locales.json` : langues, noms natifs, sens d’écriture et états de préparation.
- `src/i18n/{en,fr}/` : huit domaines JSON, anglais source et contrat TypeScript.
- `src/pages/[lang]/` : une route par page (`index.astro`, `[features].astro`, `[getStarted].astro`, `[docs].astro`), qui génère les deux langues à partir des slugs de `seo.json`.
- `src/components/` : accueil, fonctionnalités, installation, démo, ressources et éléments communs.
- `src/styles/system.css` : variables, typographie, boutons, en-tête et pied de page communs ; une feuille par page (`home.css`, `features.css`, `install.css`, `resources.css`) et `reader.css` pour l’interface FriRSS reproduite en HTML (`src/components/reader/`).
- `scripts/` : i18n, version, liens, cartes sociales, performance et préparation à la publication.
- `docs/` : recherche produit, sources, vie privée, traduction, maintenance, QA et hébergement.

## Pages et contenu

Les quatre pages (accueil, fonctionnalités, installation, ressources) existent dans les deux langues ; chacune a sa propre route dans `src/pages/[lang]/`. La démo est un service externe, ouvert directement depuis les boutons « Essayer la démo ». Les chemins français et anglais peuvent différer : `installation` / `get-started`, `ressources` / `resources`, etc. `seo.json` contient les slugs, titres et descriptions. Le sélecteur de langue conserve l’identité de la page.

Pour ajouter une page : ajouter son identifiant dans `src/config/routes.ts`, ses métadonnées dans chaque `seo.json`, un domaine de contenu si nécessaire, puis le composant et sa route dans `src/pages/[lang]/` sur le modèle des pages existantes (une route par page, pour ne charger que ses propres styles). Les routes, hreflang et sitemap sont générés automatiquement. Ajouter un lien de navigation pertinent et relancer les contrôles.

Pour une nouvelle langue, voir [I18N.md](docs/I18N.md). Aucun composant n’est à modifier. Le site utilise des propriétés CSS logiques et `dir` ; une nouvelle langue RTL doit toutefois faire l’objet d’une vraie revue visuelle.

## Mise à jour du produit

Le contenu est vérifié avec **FriRSS 1.9.1**, le 12 novembre 2026. À chaque release de FriRSS, `npm run sync:check` dit ce qui est à revoir sur le site (langues, variables, sections de l’inventaire et du README, thèmes, libellés) : voir [RELEASES.md](docs/RELEASES.md). Le site ne montre plus de captures : l’interface FriRSS est reproduite en HTML à partir des thèmes et libellés de l’application. Les anciennes captures ont été retirées ; leur origine reste documentée dans [SOURCES.md](docs/SOURCES.md).

```sh
npm run release:update
REFRESH_RELEASE=true npm run build
```

Les métadonnées de version sont résolues pendant le build, jamais dans le navigateur. L’accueil n’affiche plus de badge de version. L’API GitHub dispose d’un délai maximal de 5 secondes et d’un secours local versionné. Le build fonctionne sans réseau par défaut. Une nouvelle release ne modifie **pas** silencieusement les commandes ni les promesses fonctionnelles : relire ses notes, vérifier les fonctionnalités, mettre à jour `site.verifiedVersion`, `installation.ts`, traductions et sources.

Le contrôle de version signale désormais un écart entre la dernière release connue et la version réellement vérifiée du contenu. Suivre [la procédure de revue des releases](docs/RELEASES.md) pour actualiser la page Fonctionnalités et les traductions. Ce suivi est exécuté à la demande ; aucune surveillance en arrière-plan ni réécriture automatique du contenu.

## Confidentialité et sécurité

Par défaut : aucun analytics, aucun cookie/stockage navigateur, aucune ressource tierce nécessaire à l’affichage, aucun widget. Les liens externes ne chargent leur cible qu’après navigation. Les boutons de copie écrivent seulement au clic. La démo est un service distinct.

Le site publié compte ses visites avec **Matomo On-Premise**, auto-hébergé, sans cookie : l’activation requiert deux indicateurs explicites, un endpoint HTTPS et un identifiant numérique (variables de build), et ajoute une phrase d’information en pied de page. Cela ne constitue pas une validation juridique : voir [PRIVACY.md](docs/PRIVACY.md). Umami n’est pas retenu dans sa configuration standard en raison de sa reconnaissance des sessions. Aucun événement de clic n’est collecté.

`SITE_URL`, `BASE_PATH` et `PUBLIC_SITE_READY` sont des variables de build. Copier `.env.example` vers `.env` si nécessaire. Ne jamais y ajouter une clé secrète destinée au navigateur.

## Publication

Hébergement : **Cloudflare Pages**, relié à ce dépôt (branche `main`), commande `npm run build`, dossier `dist`, Node 24. Chaque poussée sur `main` republie le site. Variables du projet Pages : `SITE_URL`, `PUBLIC_SITE_READY=true` et les quatre variables Matomo (voir `.env.example`).

Sans ces variables (en local), le build reste volontairement **noindex** et `robots.txt` interdit l’exploration. `npm run publication:check` vérifie la configuration de publication. Voir [LAUNCH.md](docs/LAUNCH.md).

Pour un hébergement en sous-répertoire, ex. GitHub Pages : `BASE_PATH=/frirss-website/ SITE_URL=https://votre-domaine.example npm run build`. Ne pas confondre le domaine du futur site avec celui de la démonstration.

## Dépendances et CI

`package-lock.json` est versionné ; `npm ci` assure la reproductibilité. GitHub Actions exécute qualité, tests unitaires, build et Playwright Chromium/WebKit, sans permission d’écriture ni déploiement. Dependabot propose des mises à jour mensuelles, les majeures séparément ; aucune fusion automatique.

## Licence et ressources

Code du site sous MIT. Le logo FriRSS est conservé ; les ressources officielles ont une copie de leur licence dans `public/licenses/`. Les polices Mona Sans et Hanken Grotesk sont sous OFL (`Mona-Sans-OFL.txt`, `Hanken-Grotesk-OFL.txt`), comme Open Sans, utilisée seulement pour reproduire FreshRSS dans le comparateur (`Open-Sans-OFL.txt`). Les flux et articles affichés dans l’interface reproduite sont des exemples rédigés pour le site, sans contenu tiers. Voir [SOURCES.md](docs/SOURCES.md).
