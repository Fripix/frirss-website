# Charte de design — site vitrine FriRSS

Référence unique pour toute création ou retouche. Elle décrit le site tel qu’il est au 11 novembre 2026 (jalon `v1.1`) et fixe les règles à suivre. L’historique des passes est dans [DESIGN-LOG.md](DESIGN-LOG.md). Les points encore ouverts (contradictions, animations à arbitrer) sont dans [DESIGN-A-TRANCHER.md](DESIGN-A-TRANCHER.md).

Toute valeur citée ici vient de `src/styles/system.css`. En cas d’écart, le code fait foi et la charte est corrigée.

## 1. Identité

- **Intention.** Montrer un outil de lecture calme et soigné. Le visiteur doit comprendre en un écran ce qu’est FriRSS, le voir fonctionner, puis l’essayer ou l’installer.
- **Ce que le site doit faire ressentir.** Du calme, de la netteté, l’envie de lire. Un logiciel fait avec soin par quelqu’un qui s’en sert.
- **Le produit est l’image.** Chaque bande de l’accueil montre l’interface FriRSS elle-même, reproduite en HTML. Jamais d’illustration générique, jamais de capture floue ou fondue.
- **Une idée par bande.** Un titre, une phrase, le produit qui la prouve. Une bande tient à peu près dans un écran ; seule celle des fonctionnalités en occupe deux.
- **Titres.** Ils disent ce que c’est (« Installer FriRSS sur votre serveur », « Documentation et entraide »), d’une seule couleur. Seule exception, voulue : le titre du hero, dont la seconde ligne est en menthe. Le slogan du projet, « Votre FriRSS, vos règles. », n’apparaît qu’à l’appel final de l’accueil.
- **La couleur vient du produit.** Anthracite, clair et menthe pour le site ; les autres couleurs sont celles des thèmes de FriRSS, là où un thème est montré.
- **Ton.** Phrases courtes et concrètes, vouvoiement, chiffres vrais (trois dispositions, six thèmes, 38 couleurs, 30 jours hors ligne). On dit ce que fait FriRSS, pas ce qu’il « révolutionne ». Français et anglais gardent la même structure. Les textes validés ne se réécrivent pas sans accord.

## 2. Tokens

Source : `src/styles/system.css` (couche `system`). Chaque bande redéfinit les couleurs ; les composants n’utilisent que les variables et suivent donc la bande où ils se trouvent.

### Couleurs par bande

| Variable        | Sombre (`.band-dark`, `.is-dark`) | Clair (`.band-light`)    | Menthe (`.band-mint`)    |
| --------------- | --------------------------------- | ------------------------ | ------------------------ |
| `--paper`       | `#24231f`                         | `#eef2ee`                | `#4cd4a1`                |
| `--surface`     | `#2f2e29`                         | `#ffffff`                | `#6fdfb6`                |
| `--ink`         | `#f3f2ec`                         | `#161a17`                | `#06231a`                |
| `--ink-2`       | `#cfcdc3`                         | `#333a35`                | `#0c3225`                |
| `--muted`       | `#a19f95`                         | `#57615b`                | `#124231`                |
| `--line`        | blanc à 10 %                      | `rgb(22 26 23 / 0.14)`   | `rgb(6 35 26 / 0.24)`    |
| `--mint-ink`    | `#4cd4a1`                         | `#08704c`                | `#06231a`                |
| `--shot-shadow` | `0 40px 80px -30px` noir à 85 %   | `0 30px 60px -30px` 45 % | `0 30px 60px -30px` 60 % |

- **Bande sombre** : jamais un noir uni. Dégradé vertical `#2c2b26` → `#24231f` → `#1f1e1b`, plus un grain fin (`--grain`, bruit SVG en `soft-light`, motif de 440 px : plus petit, Chrome le prend pour la plus grande image du hero et retarde la mesure du premier affichage).
- **Bandes claire et menthe** : aplats.
- **Accent** : `--mint` `#4cd4a1`, survol `--mint-hover` `#66dfb2`. Sur fond menthe, l’action principale devient sombre (`#06231a`).
- **Barre du haut** : `#33322c`. **Blocs de code et menu mobile** : `--dark` `#141411`.
- **Bande des thèmes** : elle prend la couleur du thème choisi (`#4cd4a1`, `#ff48b0`, `#a6e22e`, `#f6f1e4`, `#04593c`, `#201f1b`).
- **Tuiles de fonctionnalité** : l’aplat de leur thème (`#c8efdd`, `#201f1b`, `#fbd3e8`, `#141a0f`).
- **Or** `#f5c542` : réservé à l’étoile GitHub.
- Les couleurs à l’intérieur des rendus FriRSS sont générées depuis l’application (`themeStore.ts`). On n’y touche pas.

### Typographie

- **Titres** : Mona Sans Variable, graisse 600, interlettrage serré (−0,035 em en h1, −0,03 em en h2). **Texte, boutons, menus** : Hanken Grotesk Variable. Servies localement, sous-ensemble latin.
- L’interface reproduite garde la police système (`--font-ui`). Le code est en `ui-monospace`.

| Rôle          | ≥ 1024 px  | 640–1023 px | < 640 px   |
| ------------- | ---------- | ----------- | ---------- |
| h1 `--t-h1`   | 60 px      | 50 px       | 38 px      |
| h2 `--t-h2`   | 46 px      | 38 px       | 30 px      |
| h3 `--t-h3`   | 22 px      | 22 px       | 20 px      |
| Introduction  | 18 px      | 18 px       | 17 px      |
| Texte         | 16 px      | 16 px       | 16 px      |
| Petit / label | 14 / 13 px | 14 / 13 px  | 14 / 13 px |

Interlignes : 1,04 (h1), 1,08 (h2), 1,25 (h3), 1,5 (introduction), 1,6 (texte). Titres en `text-wrap: balance`, paragraphes en `pretty`. Une introduction ne dépasse pas 34 em.

### Espacements

- Largeur de contenu : 1280 px au plus (`.wrap`). Grille de 12 colonnes (`.grid`), gouttière `--gap` 24 px (12 px sous 640).
- Marges latérales `--gut` : 80 / 48 / 20 px.
- Hauteur des bandes de l’accueil : 112 px en haut et en bas (72 px sous 640) ; le hero et les bandes à fenêtre coupée n’ont pas de marge basse.
- Barre du haut `--nav` : 84 px (72 px sous 640).

### Rayons et ombres

- Rayons : `--r-sm` 8, `--r-md` 12, `--r-lg` 16, `--r-xl` 20, `--r-btn` 999 (pilule). Les fenêtres FriRSS ont 10 px, comme une vraie fenêtre.
- Ombres : toujours décalées vers le bas (`--shot-shadow`), jamais de halo coloré autour d’un objet.
- Courbes : `--ease` `cubic-bezier(0.2, 0.7, 0.3, 1)` pour les états, `--ease-out` `cubic-bezier(0.16, 1, 0.3, 1)` pour les entrées.

## 3. Composants

- **Bande** (`.section` + `.band-*`) : pleine largeur, bords droits, une couleur de fond. Elle ne s’arrondit pas et ne porte pas d’encart.
- **Éléments collants** : la barre du haut, et une seule exception : le sommaire des étapes sur Installer.
- **Barre du haut** : flottante, en retrait des bords, coins `--r-lg`, filet et ombre. Elle contient le logo, trois liens, le bouton Étoile, la langue et « Essayer la démo ». Sous 1024 px : logo, démo (dès 640 px) et menu plein écran.
- **Boutons** : forme pilule, 48 px de haut au moins. Principal menthe, secondaire au contour. « Essayer la démo » est une touche en relief (dessus éclairé, tranche plus sombre), avec une flèche nue après son libellé, sans point ni rond : il n’y en a qu’une sorte. Les boutons Étoile ouvrent GitHub dans un nouvel onglet, annoncé aux lecteurs d’écran.
- **Coches d’état** : exception admise à la règle des coches. Sur Installer, la marque « C’est prêt » et le badge « inclus » de l’hébergement gardent leur coche, parce qu’elles indiquent un état réel et non une liste d’arguments.
- **Listes de faits** (`.facts`, prérequis d’Installer) : une ligne par fait, séparées par un filet ; ni coche ni puce. Trois faits très courts peuvent tenir sur une ligne, séparés par un filet vertical.
- **Étapes numérotées** (`.steps`) : 01, 02, 03 en gris, comme les étapes de la page Installer ; pas de pastille.
- **Lien de section** (`.link`) : texte souligné d’un trait, flèche à droite. Un seul par bande, à la fin.
- **Onglets** (`.segmented`) : pilule à segments, utilisables au clavier (flèches, Début, Fin). Chaque libellé tient sur une ligne.
- **Rendus FriRSS** (`src/components/reader/`) : `Window`, `Phone`, `UiFragment`, `Preferences`, `ConnectForm`. Ce sont des images du produit (`role="img"` et description) : couleurs générées, tailles mesurées sur la démo, contenus d’exemple neutres. Une fenêtre coupée l’est net, par le bord de sa bande, jamais par un fondu. Leur contenu est `inert` : ni focus, ni sélection, ni lecture par un lecteur d’écran, qui annonce la description de l’image. C’est ce qui permet à axe et à Lighthouse de contrôler toute la page sans exclusion.
- **Tuiles de fonctionnalité** : indépendantes, coins `--r-xl`, titre, une phrase, un fragment réel de l’interface sur l’aplat de son thème. Validées par le propriétaire (neuvième passe, reconfirmé le 11 novembre 2026) : ce ne sont ni des sections arrondies ni des encarts autour d’une capture.
- **Tuiles des chapitres de Fonctionnalités** : sous la vue de FriRSS de chaque chapitre, une tuile par fonction (titre, texte), coins `--r-xl`, sur la couleur `--surface` de la bande (blanc sur clair, anthracite plus clair sur sombre, menthe plus claire sur menthe). Trois par rangée, deux sous 1024 px, une sous 640 px. Demandées par le propriétaire le 11 novembre 2026.
- **Comparateur FreshRSS / FriRSS** (`src/components/compare/`) : dans la bande « Fonctionne avec votre serveur FreshRSS », sous le texte et les trois étapes. Trois onglets par situation (parcourir, lire, sur téléphone), mêmes articles d’exemple des deux côtés. FreshRSS à gauche, FriRSS à droite, séparés par une barre qu’on fait glisser à la souris, au doigt ou au clavier ; sur téléphone, deux téléphones côte à côte, et c’est cet onglet qui s’ouvre d’office sous 640 px. FreshRSS est reproduit en HTML d’après des mesures sur une vraie instance (thème Origine, clair), avec sa police Open Sans : on ne le caricature pas et on n’y touche pas à la main. Sous le cadre, une phrase en petit texte gris dit que FriRSS est indépendant de FreshRSS ; jamais le logo de FreshRSS.
- **FAQ et « Et tout le reste »** : à partir de 640 px, toutes les questions et leurs réponses visibles d’un coup, sur deux colonnes, chaque paire sous un filet, chaque question en titre de niveau 3 ; rien ne s’ouvre ni ne se ferme. Sous 640 px, chaque question (et chaque famille de « Et tout le reste ») devient un volet natif (`<details>`), fermé au chargement, avec un chevron qui pivote ; jamais de pastille « + ». Sans JavaScript, tout reste ouvert (`src/scripts/fold.ts`).
- **« Réglez l’interface, jusqu’au moindre bouton »** (`Customize.astro`, `src/styles/custom.css`) : bande anthracite entre les thèmes et les tuiles. Le titre a sa propre rangée sur six colonnes, coupé après la virgule, toujours en deux lignes. Dessous, à gauche, la phrase et un panneau de réglages à trois onglets (Liste, Lecture, Barres) ; à droite, une fenêtre FriRSS en trois colonnes de 820 px de haut, de la cinquième colonne au bord de l’écran, coupée net comme celle du hero ; dessous, sur toute la largeur, la liste des réglages qu’on ne montre pas (« Et ailleurs dans les Préférences »). Liste : densité Aperçu / Standard / Compact (la liste change de forme comme dans FriRSS), options de la ligne, icônes d’action. Lecture : boutons du volet. Barres : boutons de la barre de la liste et barre des raccourcis. Chaque réglage agit sur la fenêtre en CSS seul (`:has`, repères `data-tb`) ; les onglets viennent de `tabs.ts` (`data-tabs-keep` : les volets non choisis restent en place, invisibles et inertes, pour que rien ne bouge sous le panneau) ; sans script, les trois volets s’empilent. Sous 1024 px, la fenêtre ne garde que sa liste et les réglages réservés à l’ordinateur (onglet Lecture, barre des raccourcis) disparaissent, comme dans FriRSS. Libellés de FriRSS.
- **Interrupteurs** (`.switch`) : une vraie case à cocher dessinée en interrupteur (40 × 24 px, menthe quand il est actif), toute la ligne est la cible (44 px), filet sous chaque ligne. Seulement dans la bande de personnalisation, avec un sélecteur à trois segments pour la densité (vrais boutons radio).
- **Hero de l’accueil** : titre « Une interface moderne / pour votre FreshRSS » sur deux lignes entières (la seconde en menthe ne se coupe jamais ; le titre rapetisse avec sa colonne plutôt que de passer à la ligne), phrase, deux actions ; la fenêtre FriRSS à droite, coupée par le bord de la bande. Pas de commande : l’installation est l’affaire de la page Installer. Le texte occupe six colonnes.
- **Tableau des variables** (Installer, `#variables`) : sous les trois méthodes, valable pour toutes. Une ligne par variable (nom en police à chasse fixe, rôle, valeur par défaut), quatre groupes dans l’ordre du `compose.yaml` (Démarrage, Réseau, Cache Redis, Limites et stockage). Filets entre les lignes, sans fond ni cadre ; sous 640 px, chaque variable devient un petit bloc. Demandé par le propriétaire : un tableau de données, à ne pas confondre avec la « grille en tableau à filets » refusée pour les fonctionnalités.
- **« Dans votre langue, jusqu’aux articles »** (`Languages.astro`, `src/styles/languages.css`, `src/scripts/languages.ts`) : bande menthe entre les tuiles de fonctionnalités et le comparateur. À gauche, dix boutons de langue (noms tels que FriRSS les écrit) au-dessus d’une fenêtre FriRSS (barre latérale et liste) : un clic réécrit ses libellés (repères `data-l`) avec la formulation de FriRSS, copiée dans `src/data/interface-languages.json` ; le contenu des flux ne change pas. À droite, « Texte source / Traduit en français » au-dessus d’un volet de lecture : un article d’un flux allemand et sa traduction complète, titre et texte, en CSS seul ; le bouton de la barre passe de « Traduire » à « Texte source », comme dans FriRSS. Sans script, les langues ne sont pas proposées et la fenêtre garde la langue de la page.
- **Bloc de code** (`CodeBlock.astro`, `src/styles/code.css`) : fond `--dark`, bouton Copier qui confirme. Les commandes sont en `:latest`, sans numéro de version. Le `compose.yaml` d’Installer liste toutes les variables du README de FriRSS, commentées et rangées en quatre groupes ; seul `TZ` est actif. Il est construit à partir de la liste `variables` de `src/config/installation.ts`, et les titres de groupe viennent des textes de la page.
- **Appel final** (`PageClose.astro`) : bande menthe, texte et deux actions à gauche, tuile sombre « étoile » à droite.
- **Pied de page** : répertoire de liens et mentions, plus un lien vers le code source sous la marque. La mention de licence est un lien vers le fichier LICENSE. Rien d’autre, et aucune date à tenir à jour.
- **Vie privée et sécurité** : une étape de la page Installer (05, `#privacy`), pas une page à part. Trois listes (sur le serveur, dans le navigateur, ce qui sort), un badge « Aucune télémétrie », une note sur la clé de chiffrement, un lien vers SECURITY.md. Chaque phrase s’appuie sur le code de FriRSS.
- **Qui fait FriRSS** : une bande claire de Ressources, entre l’hébergement (sombre) et le soutien (menthe).
- **Film du produit** (`ProductFilm.astro`, `src/config/media.ts`) : sous l’introduction de Fonctionnalités, 16:9, coins 10 px et ombre comme les rendus. Une image fixe chargée en différé ; une vidéo, quand elle existe, a des contrôles, ne se charge pas avant la lecture (`preload="none"`), ne démarre jamais seule et ne boucle pas.

## 4. Mouvement

Le mouvement sert à montrer FriRSS en action ou à guider la lecture. Sinon, il n’y en a pas.

1. **Aucun bouton pause.** Une animation qui aurait besoin d’un bouton pour être supportable n’a pas sa place.
2. **Rien ne bouge sans fin.** Dans le hero, deux articles arrivent en moins de 5 s, puis la liste se repose ; la scène rejoue quand le hero revient à l’écran. Les dispositions et les thèmes ne changent que lorsque le visiteur clique.
3. **Boucles finies.** Les démonstrations gardées (tuiles de fonctionnalité, tuile étoile de l’appel final) démarrent quand leur bloc entre à l’écran, jouent deux cycles en moins de 5 s au total, puis s’arrêtent. Elles rejouent au survol, quand le focus clavier entre dans leur section, ou quand le bloc revient à l’écran. C’est ce qui rend le site conforme au critère WCAG 2.2.2 sans contrôle.
4. **L’état de repos est l’état final, et il est complet.** Une démonstration s’arrête sur une image pleine : article complet affiché, menu ouvert, résumé écrit. La palette ⌘K fait exception à l’ordre : elle tape « ciel », filtre, puis efface, et se repose sur la palette entière, pour que sa tuile ne reste jamais à moitié vide. C’est aussi ce que montrent la page sans JavaScript et la page en mouvement réduit.
5. **`prefers-reduced-motion`** : état final statique directement, aucune animation, aucune transition.
6. **Rien ne bouge hors écran**, ni dans un onglet en arrière-plan.
7. **Entrées** : une fois par élément, au défilement ou au chargement (entrée du hero comprise). La barre du comparateur fait partie des entrées : elle part du bord droit et rejoint le milieu en un peu plus d’une seconde, la première fois que le cadre est à l’écran. Les éléments montent ou sont découverts ; aucun texte n’apparaît en fondu ni ne reste à demi transparent.
8. **Réponses à une action** (survol, appui, onglet, thème) : courtes, 140 à 460 ms, sur `transform` et la couleur. Le changement de thème passe par une View Transition de 300 ms limitée à sa bande, là où le navigateur le permet ; ailleurs, par la transition de couleur. Le changement de disposition est immédiat et sans aucune animation, comme dans FriRSS (le propriétaire a refusé les volets qui glissent puis la vue qui se pose).
9. **Les boutons Étoile de la barre du haut sont immobiles** : la pluie d’étoiles n’existe plus que dans le grand bouton de l’appel final, comme boucle finie.
10. **Outils** : CSS natif d’abord, un seul script (`src/scripts/motion.ts`), aucune librairie.

Mise en œuvre : un bloc porte `data-loop` ; le script lui donne `.is-playing` pendant 5 s au plus ; les règles et les `@keyframes` sont dans `src/styles/motion.css`.

## 5. Responsive

- **Seuils** : 1024 px (les duos texte / visuel s’empilent, le texte d’abord) et 640 px (téléphone). Un troisième à 480 px pour une liste, un quatrième à 360 px pour le sélecteur de thèmes.
- Les règles sont écrites du grand écran vers le petit (`max-width`). Les survols sont réservés aux pointeurs fins (`hover: hover` et `pointer: fine`).
- **Aucun débordement horizontal** de 320 à 1920 px : c’est testé (320, 375, 390, 768, 1440, 1920).
- Comparateur : barre à faire glisser à partir de 640 px ; en dessous, une seule interface en pleine largeur et une bascule FreshRSS / FriRSS à deux boutons, utilisable au clavier, pour les trois situations. Entre 640 et 1023 px, la moitié FriRSS de « Parcourir » montre sa liste sans la barre latérale.
- Sur téléphone : un seul téléphone au lieu de deux, la fenêtre du hero montre la liste des articles seule, les boutons du hero prennent toute la largeur, les onglets et les noms de thèmes tiennent sur une ligne.
- Cibles tactiles : 44 px au moins.
- Les téléphones reproduits utilisent des container queries pour garder leurs proportions ; c’est le seul usage.

## 6. À ne jamais faire

Refusés par le propriétaire :

- page toute blanche ou toute sombre, noir uni ;
- halos colorés, effet verre, fondus sur les captures ;
- blocs de section arrondis, encarts pastel autour des captures, grille en tableau à filets (les quatre tuiles de fonctionnalité, voulues, ne relèvent pas de cette règle) ;
- police à empattements, textes surdimensionnés, nom géant en pied de page ;
- numéro de version affiché ; pages Démo, Galerie, Confidentialité ou Nouveautés (rien qui oblige à tenir un contenu à jour).

Tics « fait par une IA » à ne pas introduire :

- slogans en miroir (« Votre X, vos Y. ») ;
- titres en deux tons, une phrase vive suivie d’une phrase grisée (sauf le titre du hero, voulu ainsi) ;
- listes à coches vertes ;
- étapes dans des pastilles numérotées ;
- flèches dans des ronds ;
- point « en ligne » qui pulse ;
- animations décoratives en boucle, bouton pause pour les rendre acceptables ;
- illustrations génériques, icônes dans des carrés arrondis à la place du produit ;
- hero centré suivi de trois cartes ; même structure répétée à chaque section.

Ces tics ont été retirés du site en novembre 2026. La règle vaut pour tout nouvel élément. Ce qui reste discuté (la structure répétée de l’accueil, notamment) est recensé dans [DESIGN-A-TRANCHER.md](DESIGN-A-TRANCHER.md).
