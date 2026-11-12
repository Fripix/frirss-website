# Sources et vérification du produit

## État actuel — refonte du 6 novembre 2026

- Le site n’affiche aucune capture d’écran : l’interface de FriRSS est reproduite en HTML (`src/components/reader/`, `src/styles/reader.css`). Couleurs : les six thèmes livrés, générés depuis `src/stores/themeStore.ts` du code source local de FriRSS. Tailles, espacements, structure et icônes : relevés le 6 novembre 2026 sur la démo publique, connectée avec son bouton « Remplir les identifiants », dans une session où toute requête autre que GET était bloquée (rien n’a été marqué lu ni modifié sur le compte partagé). Libellés : `src/locales/fr.json` et `en.json`. Aucune version n’est affichée.
- Écarts volontaires : les petits textes et pastilles sont relevés au contraste WCAG AA sans changer les teintes ; les articles, flux, comptes et serveurs affichés sont des exemples neutres en français et en anglais (`src/i18n/*/reader.json`), sans marques ni contenus tiers ; la grille montre la vignette à initiale que FriRSS utilise pour les articles sans image.
- Les anciennes captures (`desktop.png`, `mobile-pwa.png`, `tablet.png`, `demo-*.png`) ont été retirées de `src/assets/` ; elles restent dans l’historique Git. Les sections ci-dessous documentent leur origine.
- Cartes de partage `public/assets/og-*.png` : rendues depuis le hero de l’accueil par `npm run social:images`.

## Référence produit v1.9.1 — 12 novembre 2026

Revue guidée par `npm run sync:check -- --ref v1.9.1` contre la référence v1.8.0, sur le code local de FriRSS (lecture seule) : `CHANGELOG.md` (entrées 1.9.0 et 1.9.1, la seconde lue sur la branche de travail, ajoutée après le tag), `docs/FEATURES.md` (« Compteurs de Favoris, d’À lire plus tard et des étiquettes », « Extraction du contenu complet »), `README.md`. Retouches validées par le propriétaire : format 3:4 de la grille, compteurs total / non-lus (non-lus des étiquettes à partir de FreshRSS 1.26), estimation et annulation de la préparation hors ligne, images et vidéos gardées dans l’article complet, une ligne de plus dans « Et ailleurs dans les Préférences ». Barres d’outils réglables et barre des serveurs masquable (1.9.0) : déjà présentes. Libellé `articleList.displayMode` signalé : fausse alerte (« Layout » est, dans le rendu, l’onglet des Préférences). Langues et variables : inchangées. Version vérifiée : 1.9.1.

## Vie privée et sécurité, film (11 novembre 2026)

**Étape « Vie privée et sécurité » d’Installer.** Inventaire en lecture seule du code local de FriRSS (`../FriRSS`, sans ouvrir `data/` ni `node_modules/`, sans réseau). Chaque phrase s’appuie sur :

- Base SQLite unique dans `FRIRSS_DATA_DIR` (`/app/data` dans l’image) : `server/db.ts:9-18`, `Dockerfile:70, 87-88`.
- Mots de passe bcrypt (12 tours) : `server/routes/auth.ts:3, 14, 143, 276`.
- Mot de passe API FreshRSS jamais enregistré, seul le jeton `Auth=` est gardé : `src/api/auth.ts:9-34`, `server/routes/servers.ts:112, 134-136`. Jetons chiffrés AES-256-GCM : `server/crypto.ts:4-6, 30-38`. Jamais renvoyés au navigateur : `servers.ts:100-104`. Clé dans la même base : `db.ts:159-163`.
- Articles non stockés ; sans Redis, rien n’est gardé : `README.md:217-218, 236-237`.
- Navigateur : session et préférences dans localStorage (`src/stores/authStore.ts:45-50`), icônes (`src/lib/faviconCache.ts`), hors ligne dans IndexedDB et Cache Storage (`src/lib/offlineStore.ts`, `vite.config.js:55-71`), caches vidables (`src/lib/storageEstimate.ts:45-51`).
- Ce qui sort : FreshRSS (`server/routes/proxy.ts:776-797`) ; sites des articles seulement avec l’article complet, désactivé par défaut (`src/stores/uiStore.ts:1086`) ; IA désactivée par défaut, titre et texte envoyés (`db.ts:147`, `server/ai/summarize.ts:41, 53`) ; SSO seulement si activé (`server/oidc.ts:36`) ; images chargées par le navigateur (`nginx.conf:95`).
- Aucune télémétrie, aucun rapport d’erreurs, aucune vérification de mise à jour : recherche sur `src/`, `server/`, `index.html`, `nginx.conf`, `vite.config.js`, `package.json`, `public/` ; `README.md:91`.
- Journaux : le serveur Node ne note ni IP, ni utilisateur, ni adresse d’article (`server/accessLog.ts:7-15, 31-43`), mais le nginx de l’image suit la configuration d’Alpine, absente du dépôt. Faute de pouvoir le vérifier, le site ne dit rien des journaux (phrase retirée le 11 novembre 2026, le propriétaire ne souhaitant pas compléter). Non vérifiés non plus, et non affirmés : en-têtes envoyés par helmet, rétention des journaux (pilote Docker), User-Agent des requêtes vers FreshRSS.
- Points sensibles relevés mais non mis en avant : jetons de session stockés en clair dans la base, secret OIDC en clair, sauvegarde `scripts/backup-db.js` non chiffrée. La note sur la clé de chiffrement couvre l’essentiel pour l’installateur.

**Image du film.** `src/assets/media/film-poster-{fr,en}.webp` : capture du rendu HTML « Colonnes » de l’accueil (`#layout-columns`), choisie par le propriétaire le 11 novembre 2026. Site construit, Chromium, fenêtre portée à 1280 × 720, densité 2, mouvement réduit ; 18 px de fond retirés en bas, puis recadrage 16:9 en 2560 × 1440. Ce n’est pas une capture de l’application, mais la reproduction utilisée partout sur le site.

## FreshRSS dans le comparateur (11 novembre 2026)

Le comparateur de l’accueil montre l’interface d’origine de FreshRSS à côté de FriRSS. Elle est reproduite en HTML (`src/components/compare/FreshRss.astro`, `src/styles/freshrss.css`), sans capture ni code de FreshRSS.

- **Mesures** : tailles, couleurs et disposition relevées le 11 novembre 2026 sur une instance FreshRSS de test du propriétaire, thème par défaut Origine en mode clair : vue normale à 1440 px, un article ouvert, et la disposition téléphone (règles `max-width: 840px`) à 390 px. Aucun contenu de cette instance n’est repris : les flux et articles affichés sont les exemples du site, les mêmes que du côté FriRSS.
- **Libellés** : ceux de FreshRSS, copiés de ses fichiers de traduction publics (`app/i18n/fr` et `app/i18n/en`, branche `edge` du dépôt [FreshRSS/FreshRSS](https://github.com/FreshRSS/FreshRSS)) : « Gestion des abonnements » / « Subscription management », « Flux principaux » / « Main stream », « Flux importants » / « Important feeds », « Articles favoris » / « Favourites », « Marquer comme lu » / « Mark as read », « Rechercher des mots ou des #tags » / « Search words or #tags », « Reçu aujourd’hui » / « Received today », « Par : » / « By: ». Le format de date anglais (« 6 November 2026 at 21:30 ») est déduit de la chaîne de format, pas observé.
- **Police** : Open Sans, celle de FreshRSS, servie localement via Fontsource ; licence OFL dans `public/licenses/Open-Sans-OFL.txt`.
- **Logo** : une icône RSS générique et le nom, pas le logo de FreshRSS. Les icônes sont celles déjà utilisées pour FriRSS (Heroicons), proches mais pas identiques à celles de FreshRSS.
- **Pourquoi pas le logo officiel** (vérifié le 11 novembre 2026) : le dépôt de FreshRSS est sous AGPL 3, licence de son code ; ni le `README`, ni `LICENSE.txt`, ni le fichier du logo ne donnent de licence pour le logo. La page [mentions légales](https://freshrss.org/legal.html) nomme ses auteurs (Cypouz et Vincent Lambert, discussion n° 119 du dépôt) sans conditions d’usage. Aucune règle de marque ou d’usage du logo n’a été trouvée. Non vérifié : la discussion n° 119 elle-même, la fin de `CREDITS.md`, une recherche dans tout le dépôt. Tant que les mainteneurs n’ont pas donné leur accord par écrit, le logo n’est pas repris.
- FreshRSS est un projet distinct, sous licence AGPL ; le site n’en reprend aucun code et ne prétend pas le représenter.

## Photos d’exemple (6 novembre 2026)

Les vignettes et images d’articles de l’interface reproduite viennent de Wikimedia Commons, uniquement sous licence domaine public ou CC0, recadrées en 1200 × 750 et optimisées dans `src/assets/photos/`. Aucune marque mise en avant ; une photo de soupe avec une conserve de marque a été écartée. Une ligne de crédit figure dans le pied de page.

| Fichier       | Source                                                                                                                                                                                                                                                                                                               | Licence       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `meteor.jpg`  | [Perseid Meteor Shower; 8-11-15 (20703850302).jpg](<https://commons.wikimedia.org/wiki/File:Perseid_Meteor_Shower;_8-11-15_(20703850302).jpg>)                                                                                                                                                                       | Public domain |
| `beans.jpg`   | [Vicia faba - Royal Botanical Garden, Madrid.JPG](https://commons.wikimedia.org/wiki/File:Vicia_faba_-_Royal_Botanical_Garden,_Madrid.JPG)                                                                                                                                                                           | Public domain |
| `mist.jpg`    | [Misty morning mountain (Unsplash).jpg](<https://commons.wikimedia.org/wiki/File:Misty_morning_mountain_(Unsplash).jpg>)                                                                                                                                                                                             | CC0           |
| `train.jpg`   | [20240722 Niederlande Rotterdam Centraal Station European Sleeper ES 453 nach Prag Schlafwagen 61 81 70 70 004-0 WLABee D-TRAIN 2.jpg](https://commons.wikimedia.org/wiki/File:20240722_Niederlande_Rotterdam_Centraal_Station_European_Sleeper_ES_453_nach_Prag_Schlafwagen_61_81_70_70_004-0_WLABee_D-TRAIN_2.jpg) | CC0           |
| `soup.jpg`    | [Leek Soup.jpg](https://commons.wikimedia.org/wiki/File:Leek_Soup.jpg)                                                                                                                                                                                                                                               | CC0           |
| `bird.jpg`    | [Rotkehlchen (März 2025).jpg](<https://commons.wikimedia.org/wiki/File:Rotkehlchen_(M%C3%A4rz_2025).jpg>)                                                                                                                                                                                                            | CC0           |
| `planets.jpg` | [Saturn and Jupiter Conjunction (NHQ202012130001).jpg](<https://commons.wikimedia.org/wiki/File:Saturn_and_Jupiter_Conjunction_(NHQ202012130001).jpg>)                                                                                                                                                               | Public domain |
| `leaves.jpg`  | [Fallen Leaves, Bird Park, Mount Lebanon, 2019-10-23, 01.jpg](https://commons.wikimedia.org/wiki/File:Fallen_Leaves,_Bird_Park,_Mount_Lebanon,_2019-10-23,_01.jpg)                                                                                                                                                   | CC0           |

## Historique des sources (29 octobre – 5 novembre 2026)

Référence produit : **v1.7.0**, publiée le 23 octobre 2026, consultée le 29 octobre 2026. Archive publique du tag téléchargée dans `.research/` (ignorée par Git), sans checkout modifiable du projet principal ni intervention sur son dépôt.

## Fonctionnalités et installation

- [README v1.7.0](https://github.com/Fripix/Frirss/blob/v1.7.0/README.md) : prérequis FreshRSS, API Google Reader, Docker, ports, données, compte administrateur, réseau privé, démo, thèmes, hors ligne, IA, multiutilisateur/serveurs, OIDC.
- [Release v1.7.0](https://github.com/Fripix/Frirss/releases/tag/v1.7.0) : IA facultative, fournisseurs, clés, limites et améliorations ; [v1.6.1](https://github.com/Fripix/Frirss/releases/tag/v1.6.1) : corrections OIDC.
- [docker-compose.yml](https://github.com/Fripix/Frirss/blob/v1.7.0/docker-compose.yml) : image GHCR, `8080:80`, `/app/data`, timezone et redémarrage. Les exemples du site fixent `1.7.0`, choix explicite de maintenance.
- [Inventaire des fonctionnalités](https://github.com/Fripix/Frirss/blob/v1.7.0/docs/FEATURES.md) : disposition grille, vues, YouTube chargé au clic, limites des caches, détails de l’authentification.
- Code consulté : `src/components/ArticleList/ArticleList.tsx`, `src/components/Preferences/`, `src/lib/youtube.ts`, `src/stores/themeStore.ts`, fichiers de configuration et traduction. La grille est une fonctionnalité réelle, pas seulement une proposition dans un document de conception.
- [Terminologie française](https://github.com/Fripix/Frirss/blob/v1.7.0/src/locales/fr.json) et [anglaise](https://github.com/Fripix/Frirss/blob/v1.7.0/src/locales/en.json) : Préférences, À lire plus tard, Grille, etc.
- [Licence MIT](https://github.com/Fripix/Frirss/blob/v1.7.0/LICENSE), reproduite dans `public/licenses/FriRSS-MIT.txt`.
- Unraid : badge et lien Community Applications du README officiel. Aucune installation Unraid effectuée. Le site renvoie au catalogue officiel et recommande de vérifier le modèle.

## Capture et identité

| Fichier source                                | Origine                              | Usage                                                          |
| --------------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| `logo.png`                                    | `public/logo_frirss.png`, tag v1.7.0 | Logo officiel inchangé ; redimensionnement uniquement          |
| `favicon.svg`                                 | `public/icon.svg`, tag v1.7.0        | Icône RSS officielle du projet                                 |
| `desktop.png`, `mobile-pwa.png`, `tablet.png` | `docs/screenshots/`, tag v1.7.0      | Compositions officielles ; dates de contenu antérieures au tag |
| `demo-desktop.png`, `demo-grid.png`           | Démo publique, 29 octobre 2026       | Captures réelles, compte public, interface 1.7.0               |
| `demo-themes.png`, `demo-shortcuts.png`       | Démo publique, panneaux réels        | Apparence et raccourcis clavier, dont les actions IA           |

La démo a été consultée avec les identifiants publics du README. Après connexion et lecture initiale, les requêtes d’écriture vers `/api/` ont été bloquées dans le navigateur de capture. Les changements de disposition nécessaires à la capture ne sont pas enregistrés sur le serveur. Aucune administration, clé IA, publication de contenu ni modification des abonnements.

L’IA n’est pas activée pour ce compte de démonstration : aucune fausse capture de résumé ou de traduction n’a été fabriquée. La galerie montre les raccourcis existants et l’indique explicitement. Les compositions typographiques Night/Paper de l’accueil sont décoratives et ne prétendent pas être des écrans de l’application.

Les articles, photographies et marques visibles dans les captures restent la propriété de leurs auteurs. Ne pas extraire leurs contenus pour les redistribuer comme contenus du site. Conserver la finalité de présentation du logiciel et revoir les captures lors d’une publication publique.

## Direction artistique

[BookOrbit](https://bookorbit.app/) a été étudié pour sa présentation directe du produit, ses captures à agrandir et ses accès rapides à la démo/installation. FriRSS adopte une composition distincte : titrage éditorial asymétrique, tons papier/vert forestier/menthe inspirés du logo, déroulé lecture → mobilité → personnalisation → IA → auto-hébergement. Aucun code, texte ou asset de BookOrbit repris.

Polices Mona Sans (titres) et Hanken Grotesk (texte) via Fontsource, servies localement. Open Sans, police de FreshRSS, n’est utilisée que dans son rendu du comparateur. Licences OFL copiées depuis les paquets Fontsource dans `public/licenses/` (`Mona-Sans-OFL.txt`, `Hanken-Grotesk-OFL.txt`, `Open-Sans-OFL.txt`). Images responsives WebP produites au build par Astro ; cartes sociales PNG produites localement (aujourd’hui depuis le hero de l’accueil, voir plus haut).

## Limites éditoriales conservées

- FreshRSS est toujours nécessaire ; FriRSS ne remplace pas son moteur.
- Hors ligne : articles mis en cache au préalable, stockage navigateur limité ; vidéo en ligne.
- Extraction complète : dépend du site source, aucun contournement de paywall promis.
- IA : activation admin, texte envoyé au fournisseur choisi, coût éventuel ; aucun fournisseur activé par le site vitrine.
- Redis : facultatif, fortement recommandé ; préchargement partagé conditionnel.
- OIDC : configuration nécessaire, test officiel avec Authentik, pas promesse universelle de compatibilité.
- Pas de déclaration absolue « aucune donnée ne quitte votre serveur » : IA, sources d’articles et vidéos peuvent impliquer des tiers.

## Captures complémentaires et connexion de la démo — révision P1–P13

- `src/assets/demo-list.png` : vraie disposition « List — all feeds » de la démo publique, capture 1440 × 960 après la transition de connexion.
- `src/assets/demo-tablet-grid.png` : vraie grille de la même démo, navigateur Chromium avec le profil tactile et les dimensions « iPad Pro 11 landscape » de Playwright ; il s’agit d’une émulation, pas d’une capture sur iPad physique. Le cadre de présentation est en CSS.
- Après la connexion avec les identifiants publics, les écritures API ont été bloquées avant les changements de vue. Aucun état de session n’a été sauvegardé.
- Vérification du code public actuel : `src/components/Login/Login.tsx` initialise le nom et le mot de passe à vide ; `src/api/backend.ts`, fonction `loginUser`, transmet ces valeurs par POST à `/auth/login`. Aucun paramètre d’URL pour connexion automatique n’a été trouvé dans ce parcours. Les copies consultées sont dans `.research/`, ignoré par Git.
- Sources : [écran de connexion](https://github.com/Fripix/Frirss/blob/main/src/components/Login/Login.tsx), [API de connexion](https://github.com/Fripix/Frirss/blob/main/src/api/backend.ts#L55). Une entrée de démo dédiée ou l’affichage des identifiants nécessiterait un changement de l’application ; le dépôt applicatif reste en lecture seule dans cette mission.

## Mentions de l’application et résolution des logos

La formulation « FriRSS sans traçage intégré » concerne le lecteur. Vérification dans les sources locales du tag 1.7.0 : aucun SDK de mesure d’audience/télémétrie identifié dans les dépendances ni les points d’entrée frontend/serveur examinés. Cela ne décrit pas les échanges avec FreshRSS, les ressources des articles ou un fournisseur IA configuré. Les modèles locaux et les fonctions multi-instance/multi-utilisateur sont déjà documentés dans les fonctionnalités de cette version.

Le logo officiel disponible mesure 288 × 288 px. L’accueil sert désormais une variante 156 × 156 px pour un affichage de 52 px, et l’entête/pied de page des variantes à double résolution. Aucun logo n’a été redessiné ; un original vectoriel reste préférable si le propriétaire souhaite améliorer les contours intrinsèques.

## Accès à la démo — 31 octobre 2026

README public relu : `https://frirss.fripix.ch/`, identifiant `fridemo`, mot de passe public inchangé. Le code actuel de `src/components/Login/Login.tsx` initialise identifiant et mot de passe à vide ; il ne lit pas de paramètres d’URL pour ces champs. `src/api/backend.ts` transmet les identifiants par POST à `/auth/login`. Copies de travail en lecture seule conservées dans `.research/Login-latest.tsx` et `.research/backend-latest.ts`.

L’écran public a été inspecté sans session : champs vides et aucun accès démo automatique. Une connexion de vérification avec les identifiants publics a répondu HTTP 200 ; les autres écritures API étaient bloquées et la session temporaire a été fermée. Aucun changement de l’application ni de la démo.

Le bouton de l’accueil pointe désormais directement vers l’URL officielle, dans un nouvel onglet. Un volet repliable adjacent expose les identifiants copiables et un lien vers la page locale de présentation de la démo. Aucun paramètre de préremplissage non pris en charge n’a été ajouté. Un futur préremplissage nécessiterait une fonctionnalité côté application.

## Référence produit v1.8.0 — 5 novembre 2026

La réponse directe de l’[API officielle des releases](https://api.github.com/repos/Fripix/Frirss/releases/latest) indique **v1.8.0**, publiée le 31 octobre 2026. La page GitHub indexée retournait encore 1.7.0 lors de la première consultation ; cette information a été corrigée après consultation directe.

- [Notes v1.8.0](https://github.com/Fripix/Frirss/releases/tag/v1.8.0) : tirage aléatoire, grille réglable, conservation des actions hors ligne, isolation compte/serveur, mots de passe et migration SSO/proxy/cache.
- [README v1.8.0](https://github.com/Fripix/Frirss/blob/v1.8.0/README.md) et [inventaire du tag](https://github.com/Fripix/Frirss/blob/v1.8.0/docs/FEATURES.md) : 38 couleurs, 7 tailles, 6 thèmes, largeur des cartes de 160 à 480 px et ratios 16:9 / 4:3 / 1:1. Autres fonctions présentées relues dans les sections Reading, Make it yours, Accounts et Self-hosting du README.
- [Compose v1.8.0](https://github.com/Fripix/Frirss/blob/v1.8.0/docker-compose.yml) : ports, volume, timezone, données persistantes inchangés ; exemples du site fixés à 1.8.0, sans exécution ni déploiement.
- Aide d’installation : création immédiate du premier compte, accès distant via reverse proxy, reprise de la préparation hors ligne, vérification des associations SSO et des règles de réécriture exactes, limite de restauration du proxy.

La page Galerie a été supprimée à la demande du propriétaire. Les cinq aperçus et les illustrations de l’accueil restent inchangés ; ils montrent les versions documentées plus haut et seront remplacés avec les nouveaux visuels fournis. Les liens des menus et du pied de page ouvrent directement la démo ; son panneau d’identifiants est fourni par le Worker Cloudflare indépendant du site.

## Conseils d’hébergement — 5 novembre 2026

- README actuel de FriRSS et `package.json`, consultés directement sur GitHub : version 1.8.0, stockage SQLite (`better-sqlite3`), cache Redis (`ioredis`), aucune configuration PostgreSQL documentée pour le stockage propre à FriRSS.
- [Prérequis officiels de FreshRSS](https://freshrss.github.io/FreshRSS/en/admins/02_Prerequisites.html) : PostgreSQL est la base recommandée ; SQLite, MariaDB et MySQL sont également compatibles. [Configuration des bases FreshRSS](https://freshrss.github.io/FreshRSS/en/admins/DatabaseConfig.html) : portée de ces choix côté FreshRSS.
- La page Installer distingue donc SQLite intégré à FriRSS, Redis facultatif et recommandé pour son cache, et PostgreSQL comme choix côté FreshRSS. Aucun conseil de migration obligatoire ni compatibilité PostgreSQL native de FriRSS n’est annoncé.
- `REDIS_URL` active le cache ; `CACHE_SYNC_INTERVAL` active séparément le préchargement et nécessite Redis. Les liens renvoient aux documentations respectives ; aucun service ni base n’a été configuré.
