# Rapport de vérification locale

## Accueil mobile à 100 — 11 novembre 2026 (branche `perf/hero-mobile`)

- Depuis le hero sans commande, Lighthouse prenait le grain des bandes sombres pour la plus grande image du hero : accueil mobile à 98, LCP estimé 2,3 s. Version précédente mesurée à 100 (LCP 1,0 s), et 100 aussi sans grain : la cause est confirmée.
- Le motif du grain passe de 220 à 440 px : même bruit, même densité, sous le seuil « image pauvre en détail » de Chrome. Comparaison des deux motifs dans `reports/captures-grain/`.
- Lighthouse : **100 en performance, accessibilité et bonnes pratiques sur les dix mesures** ; accueil mobile LCP 1,1–1,2 s. CLS 0,019 sur mobile et 0,015 sur ordinateur (arrivée des articles dans la fenêtre du hero), bien sous le seuil de 0,1. SEO 69 (`noindex`).
- Playwright : **80 scénarios réussis**.

## Langues et variables — 11 novembre 2026 (branche `feat/langues-variables`)

- Bande « Dans votre langue » : les dix langues réécrivent les libellés des deux rendus (date comprise, mise en forme par le navigateur) ; le contenu des flux ne change pas. La traduction de l’article marche aussi sans JavaScript ; sans script, le choix de langue n’est pas proposé. Nouveau scénario dans les deux navigateurs, avec et sans JavaScript.
- Tableau des variables : un scénario vérifie que le tableau et le `compose.yaml` listent les mêmes variables (16 noms, 4 groupes). Plus aucun débordement à 320 px.
- Playwright : **80 scénarios réussis** (Chromium et WebKit, axe compris).
- Poids de l’accueil : FR 83 413 octets compressés, EN 81 408 (FR 73 223 avant la bande).
- Lighthouse : 100 partout sauf l’accueil sur mobile, à 98 (LCP estimé 2,3 s, CLS 0,019). Mesuré sans la bande, l’accueil est déjà à 2,1–2,2 s : l’écart vient surtout du hero sans commande, dont la fenêtre animée entre maintenant dans le premier écran du téléphone. Le LCP réellement observé est de 91 ms. SEO 69 (`noindex`).

## Titres, tuiles et Docker — 11 novembre 2026 (branche `fix/titres-tuiles-docker`)

- Titre du hero et titre de la personnalisation mesurés de 320 à 1920 px, en français et en anglais : deux lignes entières partout, sans débordement.
- Fonctionnalités : plus aucun rendu ne chevauche les tuiles de 320 à 1440 px. Les téléphones du chapitre 2 recouvraient la première fonction entre 320 et 1023 px, un défaut ancien que les tuiles rendaient visible. L'ombre des panneaux n'est plus coupée par leur cadre.
- `compose.yaml` d'Installer analysé comme YAML valide (FR et EN) : seul `TZ` est actif.
- `npm run check` et `npm run build` : réussis. Playwright : **76 scénarios réussis** (Chromium et WebKit, axe compris). Le scénario de copie vérifie désormais que le hero n'a plus de commande et porte le nouveau titre. Images sociales régénérées.
- Poids de l'accueil : FR 73 223 octets compressés (74 000 avant, commande retirée).

## Personnalisation en onglets — 11 novembre 2026 (branche `feat/personnalisation-onglets`)

- Panneau à trois onglets (18 interrupteurs, densité en trois boutons radio), liste « Et ailleurs dans les Préférences ».
- `npm run check` et `npm run build` : réussis. Playwright : **76 scénarios réussis** (Chromium et WebKit, axe compris). Les deux scénarios de la bande vérifient la densité Compact, les icônes de ligne, les trois onglets, « Tout réafficher », le fonctionnement sans JavaScript et le téléphone.
- Lighthouse : performance, accessibilité et bonnes pratiques 100 sur les dix mesures, SEO 69 (`noindex`), CLS inchangé.
- Poids de l’accueil : FR 74 000 octets compressés (72 641 avant), EN 72 071. Hauteur de la bande : 1 314 px à 1440, quel que soit l’onglet ; 2 039 px à 375.

## Personnalisation de l’interface — 11 novembre 2026 (branche `feat/personnalisation`)

- Nouvelle bande d’accueil « Votre interface, bouton par bouton » (dix interrupteurs, CSS seul), trois tuiles de plus sur Fonctionnalités (21 au lieu de 18), changement de disposition sans volets qui glissent.
- `npm run check` et `npm run build` (10 fichiers HTML) : réussis. Playwright, un seul worker : **76 scénarios réussis**, Chromium et WebKit, axe compris. Deux nouveaux scénarios : les interrupteurs masquent les boutons et « Tout réafficher » les rend, avec et sans JavaScript ; sur téléphone, seuls les interrupteurs utiles sont proposés et agissent sur la liste.
- Lighthouse (dix mesures, avant le changement de disposition, qui n’ajoute rien au poids) : performance, accessibilité et bonnes pratiques 100 partout, SEO 69 (`noindex`).
- Poids de l’accueil : FR **72 630 octets** compressés (67 898 avant, +4,7 Ko pour la fenêtre FriRSS de la bande), EN 70 781. Une seconde fenêtre pour le téléphone, essayée d’abord, portait le total à 77 869 ; elle est remplacée par la même fenêtre réduite à sa liste.
- Hauteur de la bande : 1 147 px à 1440, 1 251 à 768, 1 392 à 375. Aucun débordement.

## Sans Nouveautés — 11 novembre 2026 (branche `content/sans-nouveautes`)

- Le propriétaire ne veut pas tenir d’entrées à jour : page Nouveautés, flux RSS, collection de contenu, date au pied de page et dépendance `@astrojs/rss` retirés (désinstallée hors ligne, sans contacter le registre). Le pied de page garde le lien vers le code source et la licence.
- Résultats ci-dessous.

## Crédibilité — 11 novembre 2026 (branche `content/credibilite`)

Part du jalon `v1.6`, non fusionnée.

- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (12 fichiers HTML, plus deux flux RSS) : réussis.
- Playwright, un seul worker : **76 scénarios réussis**, 38 dans Chromium et 38 dans WebKit. Nouveau fichier `tests/content.spec.ts` : volets sous 640 px et rien qui bouge au-dessus, fenêtre du hero dans le premier écran à 768 px, mention de non-affiliation, Nouveautés (ordre des dates, aucun numéro de version, flux RSS valide, lien `alternate`, pied de page), vie privée, « Qui fait FriRSS », film 16:9 en chargement différé. Scénarios adaptés : FAQ (questions par `.faq-q`, réponses visibles dès 640 px), FAQ au doigt sur téléphone, Nouveautés ajoutées aux contrôles de débordement et de boucles, mesure de l’introduction de Fonctionnalités arrêtée au film.
- **axe sans exclusion** sur les dix pages (Nouveautés comprises) : aucune violation.
- **Lighthouse 13.6.0**, douze mesures (Ressources et What’s new ajoutées) : performance, accessibilité et bonnes pratiques **100** partout, SEO 69 (`noindex` volontaire). LCP simulé 0,8 à 1,6 s sur mobile, 0,2 à 0,5 s sur ordinateur ; CLS 0, sauf l’accueil sur ordinateur à 0,015 ; TBT 0 à 30 ms. Remarque sur ordinateur, Fonctionnalités : l’image du film, chargée en différé, est l’élément le plus grand de l’écran (`lcp-discovery-insight`), sans effet sur la note.
- **Poids** (gzip par défaut) : accueil FR **68 063 octets** (67 451 à `v1.6`, +612), EN 66 418 (65 817, +601). Le surplus vient des ajouts demandés : mention sous le comparateur, signes de vie du pied de page, lien RSS, balisage des volets. Les chevrons sont en CSS plutôt qu’en SVG (−119 octets).
- Hauteur de l’accueil FR : **11 303 px à 375 px** (12 750 à `v1.6`), 11 742 à 768, 8 548 à 1440. Fenêtre du hero à 768×1024 : haut à 675 px (723 à `v1.6`). Aucun débordement de 375 à 1440 px sur les six pages capturées, aucune erreur de console.
- Firefox : toujours non testé (voir plus bas).
- Réseau : `npm install @astrojs/rss` a contacté le registre npm. Le build ne contacte pas GitHub : `scripts/release.mjs` lit `src/data/release.json` et n’interroge `api.github.com` qu’avec `--refresh` ou `REFRESH_RELEASE=true` (correction : le rapport disait l’inverse). Aucun autre outil n’a contacté de serveur.

## Questions toutes visibles — 11 novembre 2026 (branche `polish/finitions`)

- FAQ sans volets : huit questions en titres de niveau 3, réponses visibles, deux colonnes (une sous 640 px). Vérifié à 375, 768 et 1440 px, sans débordement.
- `npm run check`, tests unitaires et build : réussis. Playwright : **62 scénarios réussis** (le scénario de la FAQ vérifie maintenant huit titres et les réponses visibles sans clic). axe sans exclusion : aucune violation. Lighthouse : accessibilité 100, performance 100, bonnes pratiques 100, SEO 69 sur les huit mesures.
- Poids : accueil FR 67 451 octets compressés, EN 65 817. Planches retirées du dépôt.

## Finitions — 11 novembre 2026 (branche `polish/finitions`)

Part du jalon `v1.4`, non fusionnée.

- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (10 fichiers HTML) : réussis. Playwright, un seul worker : **62 scénarios réussis**, 31 dans Chromium et 31 dans WebKit. Scénarios adaptés : la palette se repose sur ses six lignes ; sous 640 px, la bascule FreshRSS / FriRSS au clavier et une seule interface visible.
- **axe sans exclusion** : aucune violation sur les huit pages, contraste compris. Le contenu des rendus est `inert` ; l’ancienne liste d’exclusion de `tests/a11y.ts` est supprimée.
- **Lighthouse 13.6.0** : accessibilité **100** sur les huit mesures (96 à 97 auparavant) ; performance 100, bonnes pratiques 100, SEO 69 (`noindex` volontaire) ; LCP simulé 0,8 à 1,7 s sur mobile, 0,2 à 0,3 s sur ordinateur ; CLS 0, sauf l’accueil sur ordinateur à 0,015 ; TBT 0 ms. La perte venait d’un seul audit, le contraste du texte à l’intérieur des rendus, qui gardent les couleurs de FriRSS. Ces couleurs n’ont pas changé : c’est la déclaration `inert` qui les sort du contrôle, comme le texte d’une capture.
- **Poids** : accueil FR 67 785 octets compressés, accueil EN 66 149 (limite fixée : 68 Ko). Trois polices servies.
- **Firefox : non testé.** Le Firefox de Playwright (157, build 1555) a été téléchargé puis supprimé : il s’arrête au lancement sur ce Mac (« Could not find profile folder »), y compris hors de l’environnement protégé et dans le terminal du propriétaire. Le Firefox installé (150) n’a pas pu être piloté sans outil. Les View Transitions restent donc non vérifiées dans Firefox ; sans prise en charge, le code retombe sur les transitions d’avant. La configuration des tests n’a pas été modifiée.
- Les planches (`/fr/planche/ecarts/`, `/fr/planche/structure/`) sont absentes du build, vérifié. Elles n’ont été passées ni à axe ni à Lighthouse.

## Textes et retouches de la charte — 11 novembre 2026 (branche `content/textes-charte`)

- Titres réécrits dans les deux langues, titre des fonctionnalités en un seul ton, bouton Étoile de la barre du haut à 44 px (mesuré), commentaire du CSS corrigé.
- `npm run check`, `npm run test:unit` et `npm run build` : réussis. Playwright, un seul worker : **62 scénarios réussis** (les titres d’onglet sont vérifiés page par page depuis `seo.json`). axe : aucune violation. Lighthouse non relancé.
- Non vérifié : une relecture de l’anglais par une personne dont c’est la langue.

## Trois tics remplacés — 11 novembre 2026 (branche `design/tics`)

Part de `chore/nettoyage`, non fusionnée. Listes à filets sans coches (accueil, Installer), étapes numérotées 01, 02, 03 sans pastille, flèche nue sur le bouton démo.

- `npm run check`, `npm run test:unit` et `npm run build` : réussis. Playwright, un seul worker : **62 scénarios réussis**. axe : aucune violation. Lighthouse non relancé.
- Vérifié à 1440 et 375 px sur l’accueil et sur Installer, avant et après. La planche des tics a été retirée après le choix.

## Nettoyage et dispositions en View Transition — 11 novembre 2026 (branche `chore/nettoyage`)

- Planche du hero et police Source Serif 4 retirées ; le build ne sert plus que trois polices (Mona Sans, Hanken Grotesk, Open Sans).
- Changement de disposition : mesuré dans Chromium et WebKit sur les quatre passages (2 colonnes, grille, plein écran, 3 colonnes) : les volets concernés sont animés par une View Transition, l’état final est correct, aucune erreur console. Firefox non essayé ; sans prise en charge, la vue se pose comme avant.
- `npm run check`, `npm run test:unit` et `npm run build` : réussis. Playwright, un seul worker : **62 scénarios réussis**. axe : aucune violation. Lighthouse non relancé.

## Bouton démo sans point — 11 novembre 2026 (branche `fix/point-demo`)

Part du jalon `v1.2`. Le point qui pulsait devant « Essayer la démo » est retiré des quatre emplacements du site ; son `@keyframes` (`live-ping`) aussi. Plus aucun mouvement automatique ne dépasse 5 s. Résultats des contrôles : voir le message de commit et la suite Playwright (62 scénarios).

## Comparateur FreshRSS / FriRSS — 11 novembre 2026 (branche `feat/comparateur`)

Part de `main` après la fusion des trois branches précédentes ; non fusionnée. Le comparateur remplace le schéma de la section « Fonctionne avec votre serveur FreshRSS ».

- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (10 fichiers HTML) : réussis. Playwright, un seul worker : **62 scénarios réussis**, 31 dans Chromium et 31 dans WebKit. Un nouveau scénario vérifie, en français et en anglais, les trois onglets, la présence des deux interfaces dans chacun, la barre au clavier (flèches sur le curseur, position et texte annoncé) et l’ouverture d’office de l’onglet téléphone à 375 px. axe : aucune violation ; le contraste est contrôlé partout sauf dans les rendus, FreshRSS compris (`tests/a11y.ts`).
- Vérifié à 375, 768 et 1440 px en français, et à 1440 px en anglais : pas de débordement, pas d’erreur console, police Open Sans chargée.
- Lighthouse 13.6.0 : performance 100, bonnes pratiques 100, SEO 69, accessibilité 96 à 97 (inchangé), TBT 0 à 20 ms, LCP simulé 0,9 à 1 s sur l’accueil mobile.
- Poids : le HTML de l’accueil passe de 51 à 68 Ko compressés (489 Ko bruts) à cause des six rendus ajoutés, et une troisième police de 48 Ko est servie. Lighthouse mesure 256 Ko transférés pour l’accueil sur mobile.
- Limites : la barre du comparateur n’a été essayée ni au doigt sur un vrai téléphone ni avec un lecteur d’écran ; le format de date anglais de FreshRSS est déduit, pas observé ; le rendu de FreshRSS ne reprend pas son vrai logo ni ses propres icônes.

## Arbitrage du mouvement : hero et thèmes — 11 novembre 2026 (branche `motion/arbitrage`)

Part de `feat/hero-commande`, non fusionnée. Les deux mouvements signalés comme « sans fin » dans la section suivante sont maintenant finis.

- Mesuré dans Chromium et WebKit : le compteur du hero passe de 48 à 50 en 4 s et n’en bouge plus (vérifié à 13 s, aucune animation en cours) ; hors écran il revient à 48, puis rejoue au retour. Les thèmes ne changent pas pendant 8 s sans action ; au clic, View Transition de 300 ms sur la seule bande des thèmes, puis état stable. Aucune erreur console du site.
- Plus aucun mouvement automatique ne dépasse 5 s, sauf le point « en ligne » du bouton démo (9,8 s), toujours à arbitrer.
- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (10 fichiers HTML) : réussis. Playwright, un seul worker : **60 scénarios réussis**, 30 dans Chromium et 30 dans WebKit ; le scénario du mouvement vérifie les deux arrivées, le repos, le retour à l’état de départ hors écran, l’absence de défilement des thèmes et le changement au clic. axe : aucune violation.
- Lighthouse 13.6.0 : performance 100, bonnes pratiques 100, SEO 69, accessibilité 96 à 97 (inchangé). CLS 0, sauf l’accueil sur ordinateur à 0,015 : la première arrivée d’article (à 1,2 s au lieu de 2,5 s) tombe maintenant dans la fenêtre de mesure et décale la liste. Le seuil « bon » est 0,1.
- Limite : la View Transition n’a pas été essayée dans Firefox ; sans prise en charge, le code retombe sur la transition de couleur d’avant.

## Hero avec la commande Docker — 11 novembre 2026 (branche `feat/hero-commande`)

Part de `design/charte-motion`, non fusionnée. Direction 1 de la planche du hero.

- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (10 fichiers HTML) : réussis. Playwright, un seul worker : suite complète réussie, aucun échec (60 scénarios, Chromium et WebKit) ; le scénario de copie vérifie maintenant la commande du hero dans les deux langues, sa présence dans le premier écran à 1440×900 et le presse-papiers. axe : aucune violation.
- Mesuré : à 1440×900 le hero garde sa hauteur (868 px) et la commande finit à 790 px. À 1280×720 le hero fait 871 px : la fin de la commande passe sous le premier écran. À 375 px la commande est dans le premier écran et la fenêtre FriRSS commence juste dessous (801 px pour 812). Aucun débordement, y compris dans le bloc de code.
- Lighthouse 13.6.0 : performance 100, bonnes pratiques 100, SEO 69, accessibilité 96 à 97 (inchangé), CLS 0, TBT 0 à 20 ms, LCP simulé 0,8 à 1,7 s sur mobile et 0,2 à 0,3 s sur ordinateur.
- Cartes de partage régénérées (`npm run social:images`) : même composition, sans la commande.

## Charte et mouvement — 11 novembre 2026 (branche `design/charte-motion`)

À partir du jalon `v1.1`. Charte : [DESIGN.md](DESIGN.md) ; points ouverts : [DESIGN-A-TRANCHER.md](DESIGN-A-TRANCHER.md).

- Plus aucun bouton pause. Les tuiles de fonctionnalité, le schéma FreshRSS et la tuile étoile sont des boucles finies : mesuré dans le navigateur, aucune animation sans fin, dernière animation terminée entre 4,65 et 4,9 s, puis repos sur l’état final ; elles rejouent au survol et au focus clavier.
- **Restent sans fin, en attente d’arbitrage** : l’arrivée d’articles dans le hero et le défilement automatique des thèmes. Sans bouton pause, ces deux mouvements ne satisfont pas le critère WCAG 2.2.2. Le point « en ligne » du bouton démo dure 9,8 s. Les outils automatiques (axe, Lighthouse) ne voient pas ce critère.
- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (10 fichiers HTML) : réussis.
- Playwright, un seul worker : **60 scénarios réussis**, 30 dans Chromium et 30 dans WebKit. Un nouveau scénario vérifie l’absence de bouton pause sur les 8 pages, la fin des boucles en moins de 5 s, l’état de repos, la relecture au survol et au focus clavier. Le scénario du mouvement réduit vérifie qu’aucune animation n’existe et que les tuiles montrent leur état final.
- axe : aucune violation sur les 8 pages, avec la règle habituelle.
- Lighthouse 13.6.0 : performance 100, bonnes pratiques 100, SEO 69, accessibilité 96 à 97 (contraste à l’intérieur des rendus FriRSS, inchangé), CLS 0, TBT 0 à 10 ms, LCP simulé 0,8 à 1,9 s sur mobile et 0,2 à 0,3 s sur ordinateur.
- Planche comparative du hero (`/fr/planche/hero/`, serveur de développement seulement) : absente du build, vérifié (aucune page, police ni image de la planche dans `dist/`). Ses trois pages n’ont pas été passées à axe ni à Lighthouse ; elles ne font pas partie du site.

## Cohérence et mobile — 11 novembre 2026 (branche `fix/coherence-mobile`)

Corrections après l’état des lieux, à partir du jalon `v1.0` : voir « Cohérence et mobile » dans [DESIGN-LOG.md](DESIGN-LOG.md).

- `npm run check`, `npm run test:unit` (2 tests) et `npm run build` (10 fichiers HTML) : réussis.
- Playwright, un seul worker : **58 scénarios réussis**, 29 dans Chromium et 29 dans WebKit. 375 px rejoint les largeurs contrôlées (320, 375, 390, 768, 1440, 1920). Un nouveau scénario vérifie à 375 px que les onglets et les noms de thèmes tiennent sur une ligne, que la fenêtre du hero montre la liste des articles et que le bouton pause reste au-dessus d’elle.
- axe (WCAG 2.0 à 2.2 A/AA) : aucune violation sur les 8 pages, avec la règle habituelle (contraste contrôlé partout sauf dans les rendus FriRSS).
- Lighthouse 13.6.0, accueil EN/FR, Fonctionnalités EN, Installer FR : performance 100, bonnes pratiques 100, SEO 69 (`noindex` volontaire), CLS 0, TBT 0 ms ; LCP simulé 0,8 à 1,9 s sur mobile, 0,2 à 0,3 s sur ordinateur. **Accessibilité 96 à 97, et non 100** : Lighthouse applique le contrôle de contraste à l’intérieur des rendus FriRSS, qui gardent les couleurs exactes de l’application. La même règle, lancée sur le jalon `v1.0` et sur cette branche, signale les mêmes éléments (144 sur l’accueil en grand écran, 76 sur Fonctionnalités, 1 sur Installer) et aucun en dehors des rendus : l’écart date de la passe de fidélité, pas de cette branche.
- Sur mobile, l’élément LCP de l’accueil et d’Installer est la bande sombre elle-même (son grain en image de fond). Le LCP mobile n’a pas été comparé chiffre à chiffre avec `v1.0`.
- Captures avant/après à 375, 768 et 1440 px prises sur les deux builds, dans le dossier temporaire de session, non versionnées. Cartes de partage non régénérées : le hero ne change que sous 1024 px.

## Refonte du site — 6 novembre 2026

Refonte complète sur la branche `redesign/home` : accueil, Fonctionnalités, Installer et Ressources sur un système unique (`system.css`), interface FriRSS reproduite en HTML, page Démo et anciennes feuilles de style supprimées. Les sections suivantes de ce rapport décrivent les versions précédentes.

- `npm run check` : Astro/TypeScript, ESLint, traductions (2 langues, 8 domaines) et Prettier réussis. `npm run test:unit` : 2 tests réussis.
- `npm run build` : **10 fichiers HTML** (4 pages × 2 langues, racine, 404), liens internes, images et métadonnées validés ; sitemap limité aux 8 pages.
- Playwright, **un seul worker** : **56 scénarios réussis**, 28 dans Chromium et 28 dans WebKit. Ils couvrent axe (WCAG 2.0 à 2.2 A/AA) sur toutes les pages, l’absence de requêtes externes, de cookies, de stockage et d’erreurs console, l’absence de débordement de 320 à 1920 px, les dispositions et thèmes au clavier, l’absence d’animation en boucle, le menu mobile, les onglets d’installation et leurs liens directs, la copie, le sommaire des étapes, le contenu sans JavaScript les anciennes adresses Démo, Galerie et Confidentialité en 404, et l’ordre des styles en production (les styles de page doivent l’emporter sur le système commun, placé dans une couche CSS `system`).
- axe rejoué séparément sur l’accueil dans les six thèmes de l’aperçu : aucune violation. Depuis la passe de fidélité, l’interface reproduite garde les couleurs exactes de FriRSS : le contraste est contrôlé partout sauf dans ces images de l’application (`tests/a11y.ts`), comme le texte d’une capture ; toutes les autres règles axe s’y appliquent.
- Lighthouse 13.6.0 sur le build servi localement (`npm run test:performance`), accueil EN/FR, Fonctionnalités EN et Installer FR :

| Profil     | Performance | Accessibilité | Bonnes pratiques | SEO | LCP   | CLS       | TBT  |
| ---------- | ----------: | ------------: | ---------------: | --: | ----- | --------- | ---- |
| Mobile     |         100 |           100 |              100 |  69 | 0,9 s | 0 – 0,002 | 0 ms |
| Ordinateur |         100 |           100 |              100 |  69 | 0,2 s | 0         | 0 ms |

Le SEO de 69 vient uniquement de `noindex` et de `Disallow: /`, volontaires tant que le site n’est pas publié. Lighthouse signale encore des requêtes bloquant le rendu (feuilles CSS et polices, 60 à 290 ms estimés).

- Poids : environ 92 Ko transférés pour l’accueil ; 11 à 40 Ko de CSS par page, intégrés au HTML, au lieu de 115 Ko en fichiers séparés.
- Détecteur impeccable sur les 8 pages, ordinateur et mobile : les signalements restants portent sur l’interface FriRSS reproduite (bordure d’accent, textes de 10–11,5 px de l’application) ou sur le schéma de l’accueil (deux niveaux d’encadrés), choix volontaires.
- Vérification visuelle de chaque page à 1440×900, 820×1180 et 390×844 dans Chromium ; captures dans le dossier temporaire de session, non versionnées.
- Cartes de partage `og-fr.png` et `og-en.png` régénérées depuis le hero de l’accueil (`npm run social:images`).
- Limites : émulations de navigateur, pas d’appareil physique ni de session VoiceOver complète.

## Version vivante et colorée — 6 novembre 2026 (branche `redesign/vivid`)

- Photos d’exemple (8, domaine public et CC0), sections teintées par les thèmes FriRSS, hero et introductions anthracite, animations du produit (hero vivant, dispositions et thèmes automatiques, boucles des cartes, flux du schéma, entrées au défilement).
- `npm run check`, tests unitaires, build : OK. axe : 0 violation sur les 8 pages. Playwright, un seul worker : **56/56** sur Chromium et WebKit, dont un scénario qui vérifie l’arrêt complet avec réduction des mouvements, le bouton pause et l’arrêt de la lecture automatique dès que le visiteur choisit.
- Lighthouse : 100 en performance, accessibilité et bonnes pratiques sur les 8 mesures ; LCP 0,8 s mobile, 0,2 s ordinateur ; CLS 0.

## Vérifications précédentes (29 octobre – 5 novembre 2026)

Vérifié le **29 octobre 2026**, sur le Mac du propriétaire. Aucune publication externe. Les essais Docker/Unraid de l’application ne sont pas exécutés : seuls leurs exemples documentaires ont été confrontés aux sources officielles.

## Fonctionnel et accessibilité

- **56 tests Playwright réussis**, Chromium 156 et WebKit 27.2 : les 12 pages EN/FR, langues, métadonnées, galerie, filtre, dialogue clavier, focus restauré, menu mobile, copie, FAQ, affichage sans JavaScript et commandes tactiles. Les parcours supplémentaires couvrent les aperçus interactifs, les onglets d’installation et leurs liens directs, le menu après défilement, le repérage des étapes, les cinq vues de l’accueil, le bandeau des atouts qui s’accroche sous l’entête puis se détache en remontant, le retour en haut, l’ouverture de la démo et la réduction effective des animations.
- Navigation des 12 pages aux largeurs **320, 390, 768, 1440 et 1920 px** dans les deux moteurs ; absence de débordement horizontal.
- Axe-core exécuté sur toutes les pages, avec critères WCAG 2 A/AA, 2.1 A/AA et 2.2 A/AA : **aucune violation détectée**. Une vérification supplémentaire du dialogue ouvert est incluse. Après les derniers ajustements des cartes FreshRSS/FriRSS, les 8 contrôles d’accessibilité des accueils et des pages Fonctionnalités EN/FR ont été rejoués avec succès.
- Aucune erreur console JavaScript sur les pages testées.
- Tour visuel des six pages françaises sur mobile et ordinateur, puis captures des 12 pages EN/FR ; 24 captures complètes sont disponibles localement dans `reports/`.
- Réduction des mouvements respectée par CSS. Les contenus, les trois méthodes d’installation et la FAQ native restent accessibles sans JavaScript ; les aperçus interactifs, les onglets, la galerie enrichie et le menu mobile utilisent JavaScript.

Corrections apportées après les premières passes : contrastes des textes secondaires, débordement des cartes décoratives à 320 px, largeur minimale de la page d’installation, nom accessible du sélecteur de langue. La passe UX ajoute une correction du contraste pendant les transitions : le texte reste opaque, y compris durant le mouvement. Les tests ont ensuite été rejoués. Les anciens échecs d’outillage ne sont pas présentés comme des résultats finaux.

**Limites** : axe et Playwright ne constituent pas une certification WCAG. Pas de session manuelle complète avec VoiceOver, ni d’essai physique sur iPhone/Android ; ce sont des navigateurs de bureau avec dimensions et interactions tactiles simulées. Les nouvelles langues RTL doivent faire l’objet d’une inspection dédiée.

## Confidentialité et sécurité

Pendant les tests des 12 pages dans les deux moteurs, les requêtes non locales étaient interceptées et signalées : **zéro requête tierce**. Après chargement : zéro cookie, zéro entrée localStorage/sessionStorage, zéro base IndexedDB et zéro service worker. Les liens externes n’étaient pas suivis dans ce contrôle.

CSP produite par Astro dans le HTML de production, scripts autorisés par empreintes, ressources locales, objets interdits et connexions restreintes à l’origine. La CSP n’est pas activée par le serveur Vite de développement ; elle est testée sur le build de production.

`npm audit --omit=dev` : **0 vulnérabilité signalée** lors de l’exécution du 29 octobre 2026. Cela ne constitue pas une garantie d’absence de vulnérabilité. La configuration du futur serveur HTTP n’est pas auditée ici.

## Code et build

- `npm run check` : Astro/TypeScript strict, ESLint, validation i18n et formatage Prettier réussis.
- `npm run test:unit` : **2 tests réussis**, vérifiant plusieurs défauts de traduction et les conditions de refus de l’analytics.
- `npm run build` : **14 fichiers HTML** (12 pages localisées + racine + 404), sitemap multilingue, robots, images WebP responsives et cartes de partage EN/FR.
- Vérificateur statique : liens internes, images, métadonnées, un h1 par page et cartes sociales.
- Lors de la révision précédente, build supplémentaire avec `BASE_PATH=/frirss-website/` dans `.cache/subpath` : génération et validation des 16 pages, liens et images réussies. Aucun hébergement GitHub Pages n’a été créé.
- Dépôt Git indépendant initialisé, branche `main`, aucun remote, aucun push ni publication.
- `npm run publication:check` échoue **volontairement** tant que responsable/contact/hébergement/journaux, domaine public et validation manquent.

Les sources du projet FriRSS ont uniquement été téléchargées et consultées. Aucune modification du dépôt applicatif, aucun conteneur, aucune intervention NAS/DNS.

## Lighthouse 13.6.0

Mesures de la première révision P1–P13, antérieures à la nouvelle introduction et au pied de page compact, sur le **build de production servi localement**, Chromium headless, quatre pages en mobile et ordinateur. Les rapports détaillés HTML/JSON sont dans `reports/`. Le mode mobile emploie les paramètres de simulation Lighthouse ; le mode ordinateur est configuré dans `scripts/lighthouse.mjs`. Les scores varient avec la machine et les conditions d’exécution.

| Page            | Profil     | Performance | Accessibilité | Bonnes pratiques | SEO | LCP   | CLS   |
| --------------- | ---------- | ----------: | ------------: | ---------------: | --: | ----- | ----- |
| Accueil EN      | Mobile     |          97 |           100 |              100 |  69 | 1,9 s | 0,002 |
| Accueil FR      | Mobile     |          93 |           100 |              100 |  69 | 1,9 s | 0,002 |
| Galerie EN      | Mobile     |          98 |           100 |              100 |  69 | 2,1 s | 0,001 |
| Installation FR | Mobile     |          77 |           100 |              100 |  69 | 1,4 s | 0     |
| Accueil EN      | Ordinateur |         100 |           100 |              100 |  69 | 0,5 s | 0,004 |
| Accueil FR      | Ordinateur |         100 |           100 |              100 |  69 | 0,5 s | 0,004 |
| Galerie EN      | Ordinateur |          91 |           100 |              100 |  69 | 0,6 s | 0,005 |
| Installation FR | Ordinateur |         100 |           100 |              100 |  69 | 0,3 s | 0,005 |

**Mesures après la révision P1–P13 :** le tableau restitue la passe complète, y compris les résultats sous l’objectif de 95. Les blocages les plus élevés sont observés sur l’installation FR en mobile (1 160 ms) et la galerie EN sur ordinateur (240 ms). La cause n’est pas attribuée au matériel sans preuve. Deux répétitions isolées de chacun de ces deux cas ont ensuite donné **100/100 dans les quatre mesures**, sur le même build, avec 0–50 ms de blocage total. Les résultats initiaux restent dans le tableau ; les répétitions sont enregistrées dans `reports/performance-p1-p13-repeats.json`. Cette variabilité ne permet pas de promettre un score stable. Les pages chargent leur élément principal en 1,4–2,1 s en simulation mobile, avec un CLS de 0 à 0,002.

**Le score SEO de 69 est lié au seul audit bloquant d’indexabilité** : cette livraison locale porte volontairement `noindex, nofollow` et `Disallow: /`. Les autres audits SEO applicables passent. La protection n’a pas été retirée pour améliorer artificiellement le score. L’objectif SEO ≥95 doit être remesuré après validation des données légales et de l’hébergement, sur la configuration publique autorisée.

Des recommandations non bloquantes subsistent sur l’optimisation supplémentaire de certaines images et les chaînes CSS/polices. Le JavaScript de l’accueil, données structurées comprises, représente environ **5,7 Ko non compressés**, module d’onglets partagé inclus, et ne requiert aucun framework client. Les performances de cette passe vont de 77 à 100 ; l’objectif ≥95 reste non atteint sur certains passages. Tous les audits donnent 100 en accessibilité et bonnes pratiques.

## Rejouer les mesures

```sh
npm run check
npm run test:unit
npm run build
npm test -- --workers=2
npm run preview -- --port 4322
npm run test:performance
```

Éviter d’exécuter Lighthouse en parallèle des tests navigateur. `tsconfig.json` exclut explicitement les rapports générés pour empêcher l’analyse TypeScript de leurs bundles JavaScript.

## Historique : ajustement de palette

Entête blanc, dégradé P3 partagé entre les bandeaux, boutons et pied de page en gris neutre `#2b2b2b`. Build réussi ; 8 contrôles ciblés de contraste et de navigation passent dans Chromium et WebKit, puis les 2 contrôles du bandeau fixe ont été rejoués après son éclaircissement final. Vérification visuelle à 390 et 1440 px. Les mesures Lighthouse ci-dessus précèdent cet ajustement de couleurs.

## Deuxième révision P1–P13

- Introduction en trois colonnes, onglets renommés, mentions explicitement rattachées à FriRSS, exemple IA cohérent, modèles locaux, multi-serveur et multi-utilisateur.
- Page Confidentialité supprimée dans les deux langues : anciennes routes en 404, aucun lien interne vers celles-ci, absence dans le sitemap. Neuf domaines de traduction restent actifs.
- Nouveau contrôle du retour en haut sur fond neutre, coloré et anthracite. Bandeau fixe vérifié en anthracite puis retour au dégradé lors du défilement inverse.
- Contrôle visuel de l’accueil à 320, 390, 768 et 1440 px ; l’ensemble des pages est testé aussi à 1920 px. Textes justifiés seulement lorsque la largeur le permet ; images conservées pour remplacement ultérieur par le propriétaire.
- Première passe : 28 tests Chromium réussis. La passe WebKit a rencontré quatre dépassements de délai de 45 s, dont un pendant la création de la page ; elle a été interrompue après 6 réussites supplémentaires. Charge système élevée observée (load average dépassant 50), sans modification des autres processus. Les traces initiales sont conservées dans `.cache/revision-initial-test-results`.
- Reprise WebKit avec un seul worker et délai de 120 s : **28 tests réussis** en 3,3 minutes, sans modification des assertions. Les 56 cas distincts des deux moteurs sont donc couverts. Build, contrôles de code et 2 tests unitaires réussis.
- Lighthouse n’a pas été rejoué pendant cette charge de travail ; les mesures précédentes ci-dessus sont conservées et ne sont pas présentées comme des mesures de cette seconde révision.

Après les derniers ajustements des logos et de la typographie, 6 contrôles Chromium ciblés ont été rejoués avec succès. La retouche finale du bouton étoile a ensuite été vérifiée sur mobile et les deux contrôles d’accessibilité de l’accueil français ont réussi dans Chromium et WebKit.

## Révision par parties — 30 octobre 2026

Contrôles limités aux changements, avec **un seul worker / navigateur à la fois** : 10 tests ciblés réussis dans Chromium et WebKit (accueil et fonctionnalités EN/FR, accessibilité, absence d’erreurs console/requêtes tierces, réduction des animations). Pas de nouvelle passe Lighthouse ni de suite exhaustive pour cette révision.

Inspection visuelle du schéma et du pied de page sur ordinateur ; schéma testé à 768, 390 et 320 px sans débordement. La disposition à trois pôles est conservée sur tablette et empilée sur téléphone. Vérification des styles calculés : dégradés identiques sur les parties 2 et 11 ; même taille de repère FAQ et personnalisation ; animations Installer et étoile en boucle, arrêt effectif avec réduction des mouvements, et animation étoile suspendue hors écran. Les captures sont dans `reports/parts-*.png`.

Build statique validé : 14 fichiers HTML, liens internes, images et métadonnées corrects. Les captures produit restent inchangées.

## Animations des boutons — 31 octobre 2026

Quatre contrôles ciblés réussis, avec un seul worker : accueil FR (axe, console et requêtes) et réduction des mouvements dans Chromium puis WebKit. Plusieurs captures espacées dans le temps ont permis d’examiner le liseré d’Installer et la pluie d’étoiles en mouvement ; inspection supplémentaire à 320 px, sans débordement. La pluie est bien en cours d’exécution lorsqu’elle est visible et son animation devient `none` avec la préférence de réduction des mouvements. Build statique validé, sans changement de dépendances.

La nouvelle scène du bouton Installer a ensuite été vérifiée sur un cycle complet : capture de 48 instants, contrôles du déplacement et de l’opacité des éléments, absence de débordement à 1440, 1181, 768 et 390 px, respect de la réduction des mouvements et navigation effective vers `/fr/installation/`. Les quatre contrôles ciblés Chromium/WebKit ont été rejoués avec succès. `npm run check`, le build et la validation des liens passent. La pluie d’étoiles n’a pas été modifiée.

### Accès démo et bouton du Worker — 4 novembre 2026

- Panneau d’identifiants retiré de l’accueil FR/EN, lien externe direct conservé ; styles et traductions devenus inutiles supprimés.
- Construction statique validée : 14 pages, liens, images et métadonnées contrôlés. `npm run check` réussi.
- Deux tests ciblés réussis, Chromium et WebKit avec un seul navigateur à la fois : absence du panneau, lien accessible, ouverture de la démo, absence de débordement mobile et contrôle axe de l’accueil.
- Worker v5 : bouton arrondi avec dégradé, scintillements et confirmation après remplissage. Test sur le vrai formulaire avec écritures réseau bloquées : valeurs React, copie, repli du presse-papiers, affichage 1440/768/390/320 et retrait sur inscription. Contrôle axe du panneau ouvert réussi.
- Animation, réduction des mouvements, confirmation et réinitialisation après édition vérifiées localement. Aperçu GIF issu des animations CSS du navigateur.
- Worker préparé pour remplacement manuel dans Cloudflare ; aucune nouvelle version déployée par l’assistant.

## Pages secondaires — 5 novembre 2026

- Inspection avant/après des trois pages à 1440 et 390 px ; contrôle final ciblé de l’installation à 768 px, des icônes et de la galerie sur téléphone. Captures locales dans `reports/after-*` et `reports/final-*`.
- 26 tests ciblés réussis dans Chromium et WebKit, avec un seul worker : accessibilité axe des six routes FR/EN, absence de requêtes externes et d’erreurs console, filtres et visionneuse, navigation clavier/tactile, copie des commandes, onglets avec liens directs, repères de section et retour en haut.
- Nouveaux contrôles : absence de débordement à 320 et 768 px sur les six routes, absence de chevauchement icône/titre, ouverture et fermeture clavier du volet réseau privé sur téléphone.
- Construction statique validée : 14 pages, liens, images et métadonnées. Vérifications Astro, lint et traductions réussies. Aucune publication effectuée.

## Suppression de la galerie, navigation et release 1.8 — 5 novembre 2026

- Page Galerie et routes FR/EN supprimées, traductions et CSS dédiés retirés. Les anciennes URL répondent 404 et aucun lien interne ne les cible ; les cinq aperçus de l’accueil restent présents.
- 30 tests ciblés réussis dans Chromium et WebKit, avec un seul worker : ouverture directe de la démo depuis les menus ordinateur/mobile dans les deux langues (destination interceptée, aucun accès à l’application), survol et réduction des mouvements des tuiles, mise en page 320/768 px, accessibilité et absence de requêtes externes pour accueil/fonctionnalités/installation, copie des commandes et onglets d’installation.
- Consultation réelle de l’API GitHub : détection de 1.8.0, avertissement de décalage avec la référence 1.7.0 correctement affiché. Contenu et commandes ensuite revus sur le tag 1.8.0, référence actualisée ; aucune mise à jour d’instance FriRSS.
- `npm run check` et construction statique réussis : 12 fichiers HTML, liens, images et métadonnées validés. Pas de déploiement ni de surveillance planifiée.

## Ressources et conseils d’hébergement — 5 novembre 2026

- Inspection visuelle de Ressources à 1440 et 390 px, et du nouveau bloc Hébergement sur téléphone. Captures dans `reports/resources-*.png` et `reports/hosting-mobile.png`.
- 20 scénarios ciblés validés sur Chromium/WebKit : accessibilité et requêtes locales des pages Ressources, Fonctionnalités et Installer FR/EN ; liens vers l’ancre Hébergement ; navigation collante ; survol et réduction des mouvements ; absence de débordement à 320/768 px. Les deux contrôles de largeur ont été rejoués avec succès après correction du sélecteur de test, devenu ambigu avec l’ajout de l’icône du lien.
- `npm run check`, build des 12 fichiers HTML et contrôle des liens/métadonnées réussis. Aucun changement aux serveurs, à Redis ou aux bases de données ; modifications locales du site seulement.

## Tour complet final — 5 novembre 2026

- Dix routes FR/EN parcourues dans cinq formats tactiles simulés : 320×640, 390×844, 768×1024, 1024×768 et 844×390. Pas de débordement, de menu hors écran ni d’erreur JavaScript dans les 50 visites. Inspection visuelle des captures téléphone/tablette, puis des corrections ciblées.
- Suite complète : **62 tests réussis**, Chromium et WebKit, un seul worker. Toutes les routes vérifiées sans débordement à 320, 390, 768, 1440 et 1920 px. Les tests couvrent aussi les langues, les liens, axe, l’absence de ressources externes au chargement, les onglets, la copie, la navigation clavier, le contenu sans JavaScript et la réduction des mouvements.
- Nouveau parcours tactile sur téléphone/tablette portrait/paysage : menu défilable jusqu’au dernier lien, choix Smartphone puis Grille, ouverture de FAQ, retour en haut. Réussi dans les deux moteurs.
- `npm run check`, tests unitaires et build réussis ; 12 fichiers HTML validés. PostgreSQL absent des sources publiques du site. Captures et rapport dans `reports/final-audit-*`, `reports/final-mobile-audit.json`, `reports/final-tablet-balanced.png` et `reports/final-demo-tablet.png`.
- Il s’agit d’émulations de navigateur, pas de tests sur des appareils physiques. Aucun déploiement effectué.

## Refonte éditoriale — 5 novembre 2026

- Inspection visuelle de l’accueil, des fonctionnalités, des ressources et de l’installation à 1440, 768 et 390 px. Corrections supplémentaires à 320 px, lecture/IA sur tablette et aperçu anglais. Captures dans `reports/direction/` ; les fichiers `final-*` montrent les derniers ajustements ciblés.
- Suite complète de 62 scénarios exécutée dans Chromium et WebKit, un seul worker. Correction d’un déplacement de légende de 2,4 px au changement de capture et d’un contraste insuffisant dans l’invitation finale. La passe suivante valide 58 scénarios, avec quatre échecs de contraste transitoire dans Ressources dus au fondu d’apparition.
- Fondu retiré pour garder les textes pleinement lisibles durant leur déplacement. Reprise des 20 contrôles d’accessibilité FR/EN et des deux contrôles de réduction des mouvements : **22/22 réussis**. Aucun échec restant après reprise ciblée. Aucun test assoupli pour masquer un problème ; l’attente de surface du retour en haut a été actualisée pour la section mobile devenue anthracite.
- Navigation tactile, menus, raccourcis, captures, FAQ, copie et liens directs couverts par les scénarios existants. Build des 12 pages, contrôle Astro, lint, traductions, format et diff validés. Pas de nouvelle dépendance ni de ressource externe au chargement.
- Vérifications en émulation, pas sur matériel physique. Refonte locale, sans publication. Visuels du produit existants conservés en attendant les futures captures du propriétaire.

## Découverte immersive — 5 novembre 2026

- Inspection de l’accueil, Fonctionnalités, Ressources et Installer à 1440, 768 et 390 px ; aucun débordement détecté. Captures actualisées dans `reports/direction/`. Contrôle rapproché de l’ouverture et du thème Night avec texte agrandi sur les trois formats.
- Nouveaux scénarios : comparaison des dispositions au clavier dans un cadre stable, changement de thème, contraste axe des trois ambiances, taille du texte jusqu’à 22 px sans déplacement du curseur, chapitre actif, absence de débordement dès 320 px et arrêt des animations selon visibilité/préférence système.
- Aller-retour réel accueil → fonctionnalités → accueil avec transitions natives et manipulation du thème après navigation vérifiés dans Chromium. Réduction des mouvements et navigation classique conservées.
- Build statique de 12 fichiers HTML et vérifications Astro, lint, traductions, format et diff validés. Aucun ajout de dépendance, aucune publication. Navigateurs utilisés un par un ; formats mobiles simulés, sans test sur appareils physiques.
- Suite complète après les derniers ajustements : **66/66 tests réussis** dans Chromium et WebKit, avec un seul worker.
