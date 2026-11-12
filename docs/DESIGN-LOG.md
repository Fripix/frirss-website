# Direction visuelle

Système en vigueur depuis la refonte de l’accueil du 6 novembre 2026. Il remplace les directions décrites dans l’historique plus bas ; les contenus et parcours validés sont conservés. Les quatre pages du site (accueil, Fonctionnalités, Installer, Ressources) utilisent ce système. L’ancienne page Démo est supprimée : les boutons « Essayer la démo » ouvrent directement la démo externe.

## Principes

- Le produit est montré sur chaque écran de l’accueil : l’interface FriRSS elle-même, jamais une illustration générique ni une légende qui s’excuse.
- Une idée par section, une section par écran environ à 1440×900. Texte à gauche sur cinq colonnes, visuel à droite à partir de la colonne 7, alignés en haut ; sur tablette et téléphone, le texte passe avant le visuel.
- Le site est vivant (révision du 6 novembre 2026, à la demande du propriétaire) : le hero reçoit de nouveaux articles, les dispositions et les thèmes défilent seuls jusqu’à ce que le visiteur choisisse, les cartes de fonctionnalités jouent de courtes boucles (palette ⌘K, résumé IA, appui long, article complet), le schéma montre les articles qui circulent, les blocs entrent au défilement. Règles : aucune opacité sur du texte, boucles actives seulement à l’écran, bouton pause par section, tout est coupé avec `prefers-reduced-motion` (`src/scripts/motion.ts`, `src/styles/motion.css`).
- Couleur : hero et introductions anthracite avec lueur menthe ; sections teintées par les thèmes de FriRSS (Paper crème, Desk vert acide sur noir, Riso rose, Default menthe) ; le fond de la section Thèmes suit le thème choisi ; vraies photos dans les vignettes et les articles.
- Un seul en-tête fixe et opaque ; aucune autre barre collante, aucun bouton de retour en haut.

## Identité

- Couleurs (variables de `src/styles/system.css`) : la page alterne des bandes pleine largeur aux bords droits, en aplats. Sombre : anthracite `#141411` (le noir chaud de la barre latérale de FriRSS). Clair : `#eef2ee`, surfaces blanches. Menthe : `#4cd4a1`, l’accent de FriRSS, en aplat avec un texte vert très sombre. Chaque bande fixe les variables du site (`--paper`, `--ink`, `--line`, `--mint-ink`…) ; les composants n’utilisent que ces variables et suivent donc la bande où ils se trouvent. Aucun dégradé ni halo.
- Typographie : Mona Sans (graisse 600, interlettrage serré) pour les titres, choisie par le propriétaire parmi six polices modernes ; Hanken Grotesk pour le texte, les boutons et les menus. Servies localement. Échelle : h1 60 / 50 / 38 px, h2 46 / 38 / 30 px, h3 22 px, introduction 18 px, texte 16 px, petit texte 14 px (tailles alignées sur Linear, Raycast, Readwise et Obsidian).
- Boutons : une forme pilule, deux styles seulement. Principal menthe (« Essayer la démo », même libellé dans l’en-tête, le hero et l’appel final), secondaire au contour. Cibles d’au moins 44 px.
- Logo officiel inchangé.

## Révision du 6 novembre 2026 (retours du propriétaire)

- Fonds cohérents : anthracite avec lueur menthe pour la barre du haut, le hero, les introductions et le pied de page ; blanc et menthe clair en alternance pour le contenu ; une seule exception, la section Thèmes, dont le fond suit le thème affiché. Plus de beige ni de noir « Desk » comme fond de section.
- Barre du haut sombre et translucide ; bouton « Étoile » GitHub avec une petite gerbe d’étoiles (au survol et de temps en temps) ; bouton « Essayer la démo » traversé d’un reflet discret, derrière le libellé.
- Hero dimensionné par son contenu (au plus un écran) : plus de grande zone vide sur les grands écrans.
- Dispositions au choix seulement (plus de défilement automatique), avec un quatrième mode « Plein écran » : le mode Focus de FriRSS, l’article sur toute la largeur.
- Cartes de fonctionnalités rendues chacune dans un thème FriRSS (Default, Night, Riso, Desk), ce qui explique leur couleur ; la carte « article complet » joue la vraie séquence : extrait RSS, appui sur « Article complet », « Extraction… », puis le texte entier avec son image.
- FAQ en volets qui s’ouvrent en douceur, une réponse à la fois, à côté d’un lien vers les discussions GitHub ; pied de page avec une lumière menthe qui dérive lentement et l’invitation à mettre une étoile.

## Quatrième passe (6 novembre 2026)

- Fond continu : plus de bandeaux pleine largeur. Le bloc sombre du haut (barre et hero, ou introduction) se termine par des coins arrondis, le pied de page commence par des coins arrondis ; entre les deux, un seul fond clair avec des halos menthe sans bord. La couleur vit dans les panneaux arrondis des visuels ; l’aperçu des thèmes teinte son propre panneau.
- Les éléments qui portent une ombre (fenêtres, téléphones) entrent par un simple glissement, sans masque qui couperait leur ombre.
- Accueil : sous les quatre cartes détaillées, « Et tout le reste » liste 16 fonctionnalités en bref.
- Aucune version affichée sur le site : commandes en `:latest`, plus de mention « version vérifiée » ni de volet de migration propre à une version.
- Bouton « Étoile » en relief avec une pluie d’étoiles derrière le libellé (quelques secondes à l’apparition, puis au survol) ; bouton « Essayer la démo » en relief avec un point « en ligne » qui pulse quelques fois.

## Cinquième passe : fond sombre continu (6 novembre 2026)

- Retour du propriétaire sur la quatrième passe : trop d’arrondis, trop de blanc, des encarts étranges. Toute la page passe sur un seul fond anthracite, sans bande, sans bloc arrondi et sans encart.
- Le produit est posé directement sur le fond : fenêtres et téléphones avec leur vraie ombre, et un fondu vers le bas quand ils sont coupés ; la fenêtre du hero et celle des thèmes sortent par le bord droit de la page.
- Chaque section est éclairée par la couleur d’un thème FriRSS, une lumière sans bord qui s’éteint avant les limites de la section. Dans « Six thèmes », cette lumière prend la couleur du thème choisi.
- Cartes de fonctionnalités : une grille 2 × 2 tracée par des filets, chaque case éclairée par la couleur de son thème. FAQ en lignes séparées par des filets. Schéma FreshRSS sans cadre.
- Seules les fenêtres de l’application gardent des coins arrondis (10 px), comme une vraie fenêtre.

## Après l’audit de la version sombre (10 novembre 2026)

- La lumière derrière un visuel est l’accent du thème dans lequel FriRSS y est montré (`--light-default`, `--light-riso`, `--light-paper`, `--light-desk`… dans `system.css`). Plus de halo sans produit : la FAQ et le titre des fonctionnalités restent sur le fond nu ; seul le pied de page garde sa lumière menthe qui dérive.
- La couleur vient donc du produit : sur l’accueil, le second téléphone est en thème Paper ; sur Fonctionnalités, les préférences sont en Riso, la traduction IA en Desk, serveurs et comptes en Paper.
- Chaque couche de lumière s’éteint avant le haut et le bas de sa zone (masque en fondu) : aucune lisière entre deux sections. Les fenêtres du hero et des thèmes vont jusqu’au bord de l’écran à toutes les largeurs.
- Les ombres portent un décalage ; plus de halo coloré sans décalage autour d’une fenêtre.
- Un seul jeu de couleurs de texte (`--ink`, `--ink-2`) ; les anciens noms `--on-dark*` en sont des alias.
- Photos d’article servies à leur taille d’affichage (téléphone : 280 / 520 px).

## Sixième passe : retour des bandes, sans les tics d’IA (10 novembre 2026)

- Retour du propriétaire : la version entièrement sombre est trop noire et tout s’y suit sans séparation ; l’alternance de parties sombres et claires se lisait mieux. Beaucoup d’éléments faisaient « site fait par une IA ».
- Alternance franche, en aplats : accueil sombre → dispositions clair → mobile sombre → thèmes en couleur (la bande entière prend la couleur du thème choisi : menthe, rose Riso, vert anis Desk, papier, vert High Contrast, noir Night) → fonctionnalités clair → FreshRSS sombre → FAQ clair → pied de page sombre. Fonctionnalités : clair, sombre, clair, menthe, clair. Installer : guide sur fond clair. Ressources : clair, sombre, menthe.
- Retirés parce qu’ils font générique : tous les halos et dégradés radiaux, les fondus qui effaçaient le bas des captures, l’effet verre de la barre du haut, le dégradé et l’ombre colorée du bouton démo, la lumière qui dérivait dans le pied de page.
- À la place : coupes nettes. La fenêtre du hero et celle des thèmes sont posées sur le bord inférieur de leur bande et sortent par la droite ; les cartes de fonctionnalités sont coupées par le filet de leur case.
- Le point qui parcourt le schéma FreshRSS reste : il montre le sens du flux et se met en pause.

## Septième passe : matière et caractère (10 novembre 2026)

- Retours du propriétaire : les bandes en noir uni sont tristes ; la barre du haut se confond avec le hero ; les polices font « document Word » ; les pictos de « Vos écrans » sont collés en bas de leur case.
- Bandes sombres : anthracite chaud `#24231f`, un cran plus clair que le noir, éclairé par le haut (dégradé vertical `#2c2b26` → `#1f1e1b`) et fini par un grain fin (bruit SVG en `soft-light`). Ni halo coloré ni aplat noir.
- Barre du haut : le ton le plus sombre du site (`#141411`), donc détachée du hero.
- Polices : Newsreader + Hanken Grotesk, choisies après comparaison sur le vrai site avec Funnel, Bricolage Grotesque et Host Grotesk (catalogue de taste-skill).
- Schéma FreshRSS : les trois écrans sont posés sur une même ligne et centrés dans leur case.

## Huitième passe : quatre finitions (10 novembre 2026)

- « Et tout le reste » : les 16 fonctionnalités sont rangées en quatre familles (Lecture, Organisation, Mobile et personnalisation, Hébergement), chacune une courte liste sous son nom, sans coches.
- Plus de petit libellé au-dessus des titres (chapitres de Fonctionnalités, bande Hébergement de Ressources) : le titre porte seul.
- Hero : une entrée, une seule fois, au chargement. Le titre est découvert en montant, le texte et les boutons suivent à 90 et 170 ms, la fenêtre FriRSS monte depuis le bord de la bande. Aucun fondu, rien ne rejoue, tout est cliquable dès la première image ; aucune animation avec « réduire les animations ».
- Pied de page : le nom « FriRSS » en très grand, en Newsreader, ton sur ton, comme signature (décor en CSS, hors lecture d’écran).

## Neuvième passe : retours sur la septième et la huitième (10 novembre 2026)

- Refusés par le propriétaire : la police à empattements (« vieille police de journal »), le nom « FriRSS » géant en pied de page, le titre final surdimensionné, la grille de fonctionnalités en tableau à filets, la barre du haut en bandeau noir, le bouton démo à plat. Gardé : l’anthracite en dégradé des bandes sombres.
- Polices : Mona Sans pour les titres (choix du propriétaire sur planche comparative), Hanken Grotesk pour le reste.
- Tailles de texte réduites après mesure sur des sites de référence : texte 16 px (au lieu de 17), introduction 18 px (au lieu de 20), petit texte 14 px ; le titre de l’appel final reprend la taille d’un titre de section.
- Barre du haut : une barre flottante, en retrait des bords, anthracite relevé avec filet et ombre, au-dessus de n’importe quelle bande.
- Fonctionnalités : quatre tuiles indépendantes aux coins arrondis, chacune avec son titre, sa phrase et son exemple animé, sur l’aplat de son thème (menthe clair, Night, rose Riso, Desk).
- Bouton « Essayer la démo » : une touche en relief (dessus menthe éclairé, tranche plus sombre), la flèche dans une pastille sombre ; il se soulève au survol et s’enfonce au clic.
- Retirés : le nom géant du pied de page ; le défilement vers une étape d’Installer ne compte plus deux fois la hauteur de la barre.

## Appel final : une bande à part (11 novembre 2026)

- Retour du propriétaire : sur le même fond que le pied de page, l’appel final semblait en faire partie ; la partie « étoile » était trop discrète. C’est maintenant une bande menthe, entre la dernière section et le pied de page.
- À gauche : le titre, le texte et les deux actions (la touche démo devient sombre sur la menthe).
- À droite : une tuile sombre. « FriRSS vous plaît ? » en titre doré, la phrase, puis un grand bouton à étoile centrale avec le logo GitHub et la pluie d’étoiles.
- Le pied de page ne contient plus que le répertoire et les mentions.
- La pluie d’étoiles du grand bouton tourne en continu tant que la bande est à l’écran, avec un bouton pause dans le coin de la tuile ; elle s’arrête hors écran et n’existe pas avec « réduire les animations ». Les boutons Étoile (barre du haut et tuile) ouvrent GitHub dans un nouvel onglet, annoncé aux lecteurs d’écran.

## Cohérence et mobile (11 novembre 2026)

Passe de corrections après l’état des lieux, sans changement de direction (branche `fix/coherence-mobile`, jalon `v1.0` posé avant).

- Téléphone : la fenêtre du hero montre la liste des articles seule (la barre latérale remplissait le cadre). Les onglets de disposition et les noms de thèmes tiennent sur une ligne à 375 px ; sous 360 px, un onglet entier passe à la ligne.
- Bouton pause du hero et des thèmes : en disposition empilée (moins de 1024 px), il se place au-dessus de la fenêtre, sur la bande, et ne recouvre plus un article. La bande coupe elle-même ces fenêtres, en bas et à droite.
- Vides : le schéma FreshRSS prend sa hauteur réelle et se centre sur le texte voisin (plus de hauteur minimale de 520 px) ; la bande mobile perd 32 px en haut et en bas sur grand écran et ses téléphones tiennent dans 560 px ; en disposition empilée, la fenêtre des thèmes suit le texte à 72 px.
- Rayons : une échelle de quatre tokens, `--r-sm` 8, `--r-md` 12, `--r-lg` 16, `--r-xl` 20. Les tuiles et la tuile étoile utilisent `--r-xl` ; la barre du haut (18 px auparavant), le bouton étoile et les pictos du schéma utilisent `--r-lg`. Le rayon de 10 px reste celui des fenêtres FriRSS.
- Titre de la section des dispositions : « Trois dispositions, et le plein écran » (« Three layouts, plus full screen »). FriRSS a trois dispositions ; le plein écran est son mode Focus, à part. Le hero et les listes disaient déjà « trois ».
- Licences des polices réellement servies (Mona Sans, Hanken Grotesk) dans `public/licenses/`.

## Hero : la commande Docker (11 novembre 2026)

- Choix du propriétaire sur la planche comparative du hero (trois directions, `/fr/planche/hero/` en développement) : la direction 1, « Actuel affiné ». La structure du hero ne change pas ; la commande Docker copiable s’ajoute sous les deux actions. La direction éditoriale (titres à empattements) n’est pas retenue.
- Le comparateur FreshRSS / FriRSS de la direction 3 est retenu pour plus bas dans la page, par situation (parcourir, lire, sur téléphone) plutôt que liste contre grille. Il attend des captures d’une vraie instance FreshRSS ; rien n’est construit.
- Les styles du bloc de code quittent `install.css` pour `code.css`, chargé par le composant.

## Arbitrage du mouvement : hero et thèmes (11 novembre 2026)

- Décision du propriétaire sur les deux mouvements restés sans fin après la suppression des boutons pause. Le hero reçoit deux articles en moins de 5 s puis se repose ; les thèmes ne changent plus qu’au clic, avec une View Transition de 300 ms limitée à leur bande.
- Restent à arbitrer : le point « en ligne » du bouton démo (9,8 s), le changement de disposition en View Transition. Voir [DESIGN-A-TRANCHER.md](DESIGN-A-TRANCHER.md).

## Comparateur FreshRSS / FriRSS (11 novembre 2026)

- Décision du propriétaire : le comparateur de la direction 3 de la planche est intégré plus bas dans l’accueil, à la place du schéma FreshRSS → FriRSS → écrans, et par situation (parcourir, lire, sur téléphone) plutôt que liste contre grille.
- FreshRSS est reproduit d’après des mesures sur une vraie instance (thème Origine, clair), avec sa police ; voir [SOURCES.md](SOURCES.md).
- « Parcourir » : chaque liste démarre à son bord gauche, de part et d’autre de la barre ; « Lire » : superposition simple ; « Sur téléphone » : deux téléphones côte à côte, onglet ouvert d’office sous 640 px.
- Le schéma, ses textes et sa boucle animée disparaissent. Le titre, la phrase et les trois étapes de la section restent tels quels.

## Bouton démo : plus de point qui pulse (11 novembre 2026)

- Décision du propriétaire : le point « en ligne » devant « Essayer la démo » est supprimé partout (barre du haut, hero, introduction de Fonctionnalités, appel final). C’était un des tics listés dans la charte, et son animation durait 9,8 s. La touche en relief et sa flèche ne changent pas.

## Nettoyage : planche retirée, dispositions en View Transition (11 novembre 2026)

- La planche comparative du hero (`src/planche/`, `/fr/planche/…`) et sa police d’essai Source Serif 4 sont retirées du dépôt : les deux choix qu’elle servait sont faits (direction 1 pour le hero, comparateur plus bas). Elle reste dans l’historique Git, au jalon `v1.2`.
- Changement de disposition : là où le navigateur le permet, les volets de la fenêtre glissent vers leur nouvelle place (View Transition de 320 ms) au lieu de réapparaître.

## Trois tics remplacés (11 novembre 2026)

- Choix du propriétaire sur planche (`/fr/planche/tics/`, retirée ensuite) : A1, B1, C1.
- A1 : les listes à coches vertes deviennent des lignes séparées par un filet (bande mobile de l’accueil, prérequis d’Installer) ; les trois faits de l’introduction d’Installer tiennent sur une ligne, séparés par un filet vertical.
- B1 : les trois étapes de l’accueil sont numérotées 01, 02, 03 en gris, comme sur la page Installer, sans pastille.
- C1 : la flèche du bouton « Essayer la démo » perd son rond ; la touche en relief reste.
- Restent des coches sur Installer : la marque « C’est prêt » et le badge « inclus » de l’hébergement. Ce sont des états, pas des listes.

## Textes en miroir et contradictions de la charte (11 novembre 2026)

- Décision du propriétaire : mes propositions sont appliquées telles quelles.
- Titres réécrits, en français et en anglais : « Installer FriRSS sur votre serveur », « Documentation et entraide », « Les fonctionnalités essentielles » ; appel final de Fonctionnalités : « La démo est ouverte. » ; pied de page : « FriRSS est sous licence MIT. » ; titres d’onglet de l’accueil, de Fonctionnalités et d’Installer. Le slogan reste à l’appel final de l’accueil.
- Titre des fonctionnalités de l’accueil : la première phrase seule en titre, la seconde en texte normal dessous, mêmes mots.
- Contradictions : le site a raison sur douze points ; commentaire du CSS corrigé ; bouton Étoile de la barre du haut à 44 px ; deux exceptions écrites dans la charte.

## Finitions (11 novembre 2026)

- Décisions du propriétaire, jalon `v1.4` posé avant : la pluie des petits boutons Étoile est supprimée ; l’entrée du hero, les entrées au défilement, la FAQ et les survols sont gardés ; les deux coches d’état d’Installer sont une exception admise.
- Tuile « Se pilote au clavier » : la démonstration tape, filtre, puis efface ; elle se repose sur la palette entière.
- Comparateur sous 640 px : une interface en pleine largeur et une bascule FreshRSS / FriRSS, pour les trois situations. Entre 640 et 1023 px, « Parcourir » montre la liste de FriRSS sans sa barre latérale.
- Les rendus sont déclarés `inert` : axe et Lighthouse contrôlent toute la page sans exclusion.
- Trois planches attendent un choix : titre du hero en une couleur, tuiles sans fond pastel, deux structures pour l’accueil. Voir [DESIGN-A-TRANCHER.md](DESIGN-A-TRANCHER.md).

## Titre du hero et tuiles gardés (11 novembre 2026)

- Le propriétaire garde le titre du hero en deux couleurs et les quatre tuiles de fonctionnalité. La planche des variantes (une couleur ; sans tuile) est retirée. La charte note les deux comme voulus.

## Questions toutes visibles (11 novembre 2026)

- Choix du propriétaire après la planche des deux structures (une visite guidée, un mode d’emploi) : la structure actuelle reste. Seul emprunt : les questions et réponses toutes visibles, sur deux colonnes, sans volets ni pastilles « + ». Refusés : le pied de page sur une ligne, la suppression de la tuile « FriRSS vous plaît ? ». La planche est retirée.

## Crédibilité (11 novembre 2026, branche `content/credibilite`)

- Sous 640 px, la FAQ et « Et tout le reste » passent en volets natifs ; au-dessus, rien ne change. Accueil à 375 px : 11 111 px de haut au lieu de 12 750.
- À 768 px, le hero est resserré : la fenêtre FriRSS commence à 675 px dans un écran de 1024 (723 px avant ; elle était déjà dans le premier écran, contrairement à ce que disait le rapport de la phase 3).
- Mention de non-affiliation sous le comparateur. Page Nouveautés et flux RSS, signes de vie au pied de page, étape « Vie privée et sécurité » sur Installer, bande « Qui fait FriRSS » sur Ressources, emplacement du film sur Fonctionnalités avec une image provisoire tirée du rendu HTML. Nouveaux textes à valider avant fusion.

## Sans détails personnels (11 novembre 2026, branche `content/sans-details`)

- Le propriétaire ne souhaite donner aucun détail sur lui. « Qui fait FriRSS » garde seulement ce qui est déjà public : le pseudonyme Fripix et GitHub. La phrase non vérifiée sur les journaux (nginx de l’image) est retirée de « Aucune télémétrie ». Plus aucun marqueur dans les textes.

## Sans Nouveautés (11 novembre 2026, branche `content/sans-nouveautes`)

- Le propriétaire ne veut rien qui oblige à tenir un contenu à jour. Page Nouveautés, flux RSS et date de la dernière nouveauté retirés ; le pied de page garde le code source et la licence. Ajouté aux interdits de la charte.

## Film : trois colonnes (11 novembre 2026, branche `content/capture-colonnes`)

- À la demande du propriétaire, l’image sous l’introduction de Fonctionnalités montre FriRSS en trois colonnes (flux, liste, article ouvert), tirée du rendu HTML. Elle n’est plus marquée provisoire.

## Personnalisation de l’interface (11 novembre 2026, branche `feat/personnalisation`)

- Le propriétaire trouvait la personnalisation trop peu montrée. Nouvelle bande d’accueil « Votre interface, bouton par bouton » après les thèmes (composition A de la planche : interrupteurs à côté de la fenêtre, préférée à B, interrupteurs au-dessus, où la fenêtre tombait sous l’écran). Trois tuiles ajoutées au chapitre « Créez votre espace » de Fonctionnalités : barres, liste, vue à l’ouverture.
- Une seule fenêtre FriRSS : sur petit écran, elle ne garde que sa liste (une seconde fenêtre coûtait 5 Ko compressés de plus). Planche retirée.

## Dix langues (11 novembre 2026, branche `content/multilingue`)

- FriRSS est traduit en dix langues, ce que le site ne disait pas. Une ligne dans « Et tout le reste » (Mobile et personnalisation) et une tuile « Dix langues » au chapitre « Créez votre espace » de Fonctionnalités (22 tuiles). Source : `../FriRSS/src/locales/` et `README.md:120`.

## Dispositions sans animation, dix langues dans le hero (11 novembre 2026, branche `fix/dispositions-langues`)

- Le changement de disposition est immédiat, sans aucune animation : la vue qui se pose (240 ms) a été jugée aussi désagréable que les volets qui glissent.
- Les dix langues sont un point fort : la phrase du hero les cite (« trois dispositions, six thèmes, dix langues et vos articles hors ligne sur téléphone »), à la demande du propriétaire.

## Personnalisation en onglets (11 novembre 2026, branche `feat/personnalisation-onglets`)

- Le propriétaire jugeait la bande partielle : elle ne montrait que les boutons masquables. Elle devient un panneau à trois onglets, façon Préférences (choisi parmi deux propositions, l’autre étant une fenêtre découpée en zones) : densité Aperçu / Standard / Compact, options et icônes de ligne, boutons du volet de lecture, barres ; plus une liste « Et ailleurs dans les Préférences » (ordre des articles, disposition par flux, vue à l’ouverture, marquer lu au défilement, cartes de la grille, nom et logo, raccourcis, dix langues).
- Fenêtre de hauteur fixe et volets d’onglets superposés : rien ne bouge quand on change d’onglet.

## Titres, tuiles et Docker (11 novembre 2026, branche `fix/titres-tuiles-docker`)

- Hero : « Une interface moderne / pour votre FreshRSS » (EN « A modern interface / for your FreshRSS »), à la demande du propriétaire. Chaque ligne reste entière à toutes les largeurs : le titre rapetisse avec sa colonne (unités `cqi`). Commande Docker retirée du hero ; le texte passe de cinq à six colonnes.
- Personnalisation : titre sur sa propre rangée, coupé après la virgule, deux lignes à toutes les largeurs (il en faisait trois sur ordinateur).
- Fonctionnalités : les fonctions de chaque chapitre deviennent des tuiles, coins `--r-xl`, sur la couleur de surface de leur bande. Sous les vues de FriRSS, les textes posés sur le même fond donnaient l’impression d’un fond qui recommence.
- Installer : le `compose.yaml` contient les quinze variables du README de FriRSS, commentées avec leur valeur par défaut et une ligne d’explication, en français ou en anglais selon la page. Seul `TZ` est actif.

## Langues et variables (11 novembre 2026, branche `feat/langues-variables`)

- Le propriétaire trouvait le `compose.yaml` peu clair et voulait voir davantage le multilingue et la traduction complète des articles.
- Installer : le `compose.yaml` ne garde que les variables commentées, en quatre groupes titrés ; un tableau « Variables d’environnement » les explique (rôle, valeur par défaut), valable aussi pour `docker run`.
- Accueil : nouvelle bande menthe « Dans votre langue, jusqu’aux articles » (choisie parmi trois propositions, les autres étant de retoucher la tuile IA et Fonctionnalités, ou les deux). Les dix langues réécrivent une vraie fenêtre FriRSS ; la traduction IA montre un article allemand traduit en entier. Libellés copiés des traductions de FriRSS.
- Installer, réseau privé : pour Compose, le texte dit de retirer le # devant la ligne `PROXY_INTERNAL_HOSTS` (déjà présente dans le fichier) au lieu de l’ajouter. Validé par le propriétaire.

## Accueil

1. Hero : « Le lecteur moderne pour votre FreshRSS », phrase d’explication, démo et installation ; fenêtre FriRSS (barre latérale et liste) dans un cadre sauge.
2. Trois dispositions : 3 colonnes, 2 colonnes, grille, au clic ou aux flèches, dans un cadre de hauteur fixe.
3. Mobile, sur bande anthracite : deux téléphones (liste, article), un seul sur petit écran.
4. Thèmes : les six thèmes livrés recolorent la fenêtre.
5. Quatre fonctionnalités, chacune avec un fragment réel de l’interface (article complet, palette ⌘K, rangement par appui long, résumé IA).
6. FreshRSS et FriRSS : le seul endroit qui explique leur relation, avec le schéma et les trois étapes d’installation.
7. Questions affichées en entier, puis l’appel final « Votre FriRSS, vos règles. » et le pied de page.

## Fonctionnalités

Un sommaire des cinq familles en ouverture, puis cinq chapitres de même forme : numéro et titre, phrase d’introduction, une grande vue de FriRSS qui montre ces fonctions, puis les fonctions en colonnes de texte, sans cadre ni icône. Vues : trois colonnes avec la palette ⌘K (Lecture), deux téléphones dont un hors ligne sur bande anthracite (En déplacement), Préférences › Apparence (Personnalisation), article avec résumé IA et menu de traduction (IA facultative), serveurs et comptes (Hébergement). Les 18 textes validés sont repris tels quels ; la page se termine par la ligne de version vérifiée et l’appel final commun.

## Installer

Un guide en Lecture : une colonne de texte, le sommaire des étapes à gauche sur grand écran. Ce sommaire est la seule exception à la règle de l’en-tête seul collant : il reste visible et marque l’étape en cours. Étapes 00 à 04 numérotées, séparées par un filet, sans encadré imbriqué ; onglets Docker / Compose / Unraid avec liens directs ; blocs de code anthracite avec bouton Copier ; à l’étape 03, les trois champs expliqués à côté du vrai formulaire FriRSS « Ajouter un serveur FreshRSS ». Pas d’appel final : le visiteur est déjà en train d’installer.

## Ressources

Un annuaire lisible d’un coup d’œil : les trois groupes côte à côte sur grand écran, chaque lien en ligne cliquable entière avec son titre, sa description et sa destination réelle (« GitHub · README », « GitHub · Releases »…). Puis deux bandes calmes : hébergement et performance (vers Installer#hosting), soutien au projet. Ni carte sombre, ni icônes génériques, ni appel final.

## Interface FriRSS en HTML

`src/components/reader/` reproduit l’application telle qu’on la voit sur la démo publique : les 38 couleurs des six thèmes sont générées depuis `src/stores/themeStore.ts` dans FriRSS, sans retouche ; tailles, espacements, badges et barres d’outils sont mesurés dans le navigateur sur la démo (session en lecture seule, toute écriture bloquée) ; les icônes sont celles de l’application (Heroicons, MIT, et dessins propres à FriRSS) ; les libellés viennent de ses fichiers de langue, en français et en anglais (`src/i18n/*/reader.json`). Les téléphones sont composés à la largeur réelle d’un iPhone (390 points), puis réduits au cadre, comme une capture. Les flux et articles restent des exemples neutres, sans marques tierces. Comme sur une capture, le texte de ces images garde le contraste de l’application : le contrôle de contraste axe porte sur tout le reste du site (WCAG 1.4.3, texte d’image), toutes les autres règles s’appliquent aussi aux rendus.

## Technique

- `system.css` : variables, typographie, boutons, en-tête, menu mobile plein écran, pied de page, dans la couche CSS `system` : les feuilles de page l’emportent toujours, quel que soit l’ordre produit par le build. `home.css`, `features.css`, `install.css`, `resources.css` et `reader.css` pour les pages refaites. L’accueil, Fonctionnalités, Installer et Ressources ont leur propre route (`src/pages/[lang]/index.astro`, `[features].astro`, `[getStarted].astro`, `[docs].astro`) et ne chargent pas les anciennes feuilles. L’appel final commun est `PageClose.astro`.
- Aucun attribut `style` en ligne : la politique de sécurité de production les bloque. Les feuilles de chaque page sont intégrées au HTML au build (Astro ajoute leurs hachages à la CSP) et les deux polices sont préchargées.
- Les anciennes feuilles (`global.css`, `experience.css`, `pages.css`, `direction.css`) et les composants `Heading`, `Shot`, `Demo` ont été supprimés.

## Historique (avant la refonte de novembre 2026)

Les sections ci-dessous décrivent les directions précédentes ; elles ne s’appliquent plus à l’accueil.

Le lecteur RSS est un outil du quotidien ; le site privilégie l’espace de lecture et la maîtrise personnelle. Trois directions ont été évaluées : un univers technique sombre, une vitrine très colorée centrée sur les thèmes et une composition éditoriale sur papier clair. La troisième a été retenue pour la lisibilité des captures, la durée de vie visuelle et le contraste avec les interfaces souvent denses des lecteurs.

Palette : papier `#f7faf9`, encre pétrole `#173f43`, menthe et turquoise dérivés du logo officiel. Le pied de page, les boutons principaux et les sélections actives utilisent un gris anthracite neutre `#2b2b2b`. Le panneau des captures conserve son dégradé sauge et son quadrillage demandés. Le logo n’est pas redessiné. Manrope pour les titres, DM Sans pour le texte, toutes deux servies localement. Espaces généreux, titres asymétriques, fines bordures, sections de profondeur variable ; pas de suite uniforme de cartes marketing.

Accueil : proposition de valeur explicite, actions démo/installation/GitHub, aperçu interactif de cinq vues réelles (ordinateur en trois colonnes, liste, grille, grille au format iPad et article sur iPhone) dans un cadre discret. Les images changent uniquement à la demande, sans rotation automatique, et le cadre conserve sa hauteur. Puis grille de lecture, mobile sur le même dégradé sauge/crème, personnalisation typographique décorative, IA facultative, relation FreshRSS/FriRSS, open source et FAQ.

Les transitions sont des changements CSS courts sur liens, boutons et images, avec une légère translation à l’entrée de certaines sections dans la fenêtre. Les textes restent totalement opaques pour conserver leur contraste pendant les mouvements. Aucun défilement automatique des captures ni animation continue. `prefers-reduced-motion` supprime les transitions et le défilement doux. Galerie filtrable avec dialogue natif, commandes précédent/suivant, touches fléchées, Échap et gestes tactiles. La mise au point revient au déclencheur.

Les captures sont fidèles ; le site précise qu’elles peuvent contenir une autre langue. Les textes longs disposent d’une largeur de lecture limitée ; les pages pratiques utilisent des titres d’étape et des commandes copiables.

### Parcours améliorés

- Navigation principale fixe au défilement, accès direct à la démo, état actif visible, menu mobile superposé et retour en haut avec restitution du focus au titre.
- Accès directs aux cinq familles de fonctionnalités, et repérage de l’étape courante dans le guide d’installation.
- Onglets Docker / Docker Compose / Unraid : flèches, Début et Fin au clavier ; liens directs `#docker`, `#compose`, `#unraid`. Sans JavaScript, toutes les méthodes restent visibles.
- Démo : identifiants, explication et action réunis ; ouverture explicitement annoncée dans un autre onglet pour conserver les identifiants à portée de main. Sur mobile, cet accès précède la capture.
- Galerie : nombre de résultats visible, légendes dans la visionneuse, indication des raccourcis et distinction entre balayage horizontal et défilement vertical.
- Ressources et fonctionnalités : cartes plus espacées, repères visuels et zones de clic explicites.

Les interactions sont écrites en TypeScript natif (`src/scripts/tabs.ts`, `src/scripts/experience.ts`), sans bibliothèque supplémentaire. Elles ne créent aucun stockage persistant ni appel réseau tiers. Le style des améliorations est regroupé dans `src/styles/experience.css`.

### Révision P1–P13

Le slogan devient le titre du bandeau coloré, avec une explication immédiate du rôle de FriRSS et une action principale vers la démo. La gratuité et l’absence de traçage intégré à FriRSS sont visibles dès ce bandeau.

L’entête agrandit ses liens et donne accès à GitHub et Buy Me a Coffee. Le bandeau des atouts devient une navigation vers les sections, se cale sous l’entête et devient anthracite pendant son accrochage. Un observateur de dimensions conserve les bons décalages d’ancrage après redimensionnement. En remontant, le bandeau retrouve sa position et sa couleur.

La capture de lecture est droite, sans faux chrome de navigateur, avec une ombre légère. La section IA illustre un résumé et une traduction sur un texte original, explicitement présentés comme un exemple éditorial et non comme une capture. Les rôles de FreshRSS et FriRSS sont expliqués par deux cartes structurées.

Le pied de page est organisé en présentation, navigation et soutien, sur fond anthracite. La phrase sur la personnalisation passe dans le bandeau principal. Les liens de signature et de licence sont retirés du pied de page, conformément à la demande ; les notices de licence des ressources restent conservées. Une invitation à mettre une étoile sur GitHub figure dans la section du projet et dans le pied de page.

### Harmonisation de la palette

L’entête et le menu mobile sont blancs. Les bandeaux d’accueil, de captures, d’atouts et la section mobile partagent le même dégradé radial sauge/crème, défini une seule fois par `--surface-gradient`. Le quadrillage est réservé au panneau des captures et reste inchangé. Le bandeau des atouts devient anthracite une fois fixé sous l’entête. `--anthracite` définit la couleur commune du pied de page et des boutons, sans dominante verte ou bleue.

### Deuxième révision de l’accueil

- Introduction en trois colonnes sur grand écran, réorganisée sur tablette et empilée sur téléphone. Accroche centrée, slogan en DM Sans, démo associée à la gratuité et à l’absence de traçage intégré à FriRSS. Version retirée de l’accueil.
- Navigation des aperçus : Vue complète, Liste, Grille, Tablette et Smartphone. Captures conservées en attendant les cinq visuels fournis par le propriétaire ; remplacement optionnel de la capture téléphone de la section mobilité.
- Explication FreshRSS plus discrète ; bandeau collant anthracite, transition douce. Retour en haut translucide : fond menthe sur une zone neutre, blanc sur une zone colorée ou le pied de page.
- Repères 01–04 agrandis, titre de lecture sans retour imposé, colonne de personnalisation élargie. Prose justifiée sur grand écran avec césure limitée, alignée à gauche sur petit écran.
- Exemple IA : extrait substantiel, résumé fidèle et traduction de ce résumé. Modèles locaux cités ; plusieurs serveurs et plusieurs utilisateurs explicités dans le bloc de connexion.
- Logo servi à une résolution adaptée aux écrans denses. Animation limitée de la flèche Installer ; étoile animée à l’apparition et au survol, mouvements désactivés selon la préférence système.
- Pied de page compact, identité en bas. Page Confidentialité et liens retirés dans les deux langues à la demande du propriétaire.

### Révision par parties — 30 octobre 2026

- Partie 1 : halo sauge continu autour d’Installer, cycle lent de 4,8 secondes, texte immobile.
- Partie 2 : pitch explicite « une interface moderne pour FreshRSS », repris en anglais.
- Partie 10 : carte de connexions centrée sur FriRSS, entre FreshRSS et les écrans, avec branches multi-serveur et multi-utilisateur. Les trois pôles restent horizontaux sur tablette et deviennent verticaux sur téléphone.
- Partie 11 : même `--surface-gradient` que l’introduction. Deux fines traînées lumineuses alternent derrière le bouton GitHub ; l’étoile scintille doucement. La boucle se met en pause hors écran via IntersectionObserver. Les effets n’animent que transform et opacity, sans minuterie JavaScript, et respectent la réduction des mouvements.
- Partie 12 : repère FAQ à la même taille que les repères numérotés.
- Partie 13 : liens de pied de page espacés de 34 px environ au lieu de 47 px, marges et badges resserrés ; cibles tactiles conservées à au moins 34 px sur téléphone.

### Boutons — 31 octobre 2026

Le halo d’Installer est remplacé par un liseré lumineux tournant, contenu dans le bord du bouton anthracite. Le texte reste immobile. Le bouton GitHub accueille une pluie de seize petites étoiles à cinq et quatre branches, avec tailles, vitesses et phases différentes. Le fond est légèrement atténué derrière le texte pour préserver sa lecture. Les anciennes traînées et le scintillement de l’icône principale sont supprimés. Ces boucles CSS respectent la réduction des mouvements ; la pluie est suspendue hors écran. Aucun canvas ni minuterie de rendu JavaScript.

### Installer : petite scène de produit — 31 octobre 2026

Après rejet du liseré, le bouton conserve son fond anthracite et son libellé fixe, avec une pastille sauge de 32 px. Une flèche descend dans un réceptacle qui amortit le mouvement ; le logo FriRSS apparaît avec un léger rebond, puis le cycle reprend toutes les 4,8 secondes. L’animation ne simule pas un téléchargement réel ni un état de réussite : le clic ouvre toujours le guide d’installation. Sans mouvement, une icône de téléchargement statique demeure. La pluie d’étoiles validée reste inchangée.

Références de mouvement consultées : [les micro-interactions SVG d’Alex Cruttenden](https://alexcruttenden.com/interactions/) et [Pure CSS Animated Download Button de nw](https://codepen.io/nw/pen/XWMBGO). Composition et code propres au site, sans bibliothèque ni asset provenant de ces exemples. Aperçu local du cycle dans `.cache/installer-preview.gif`.

### Pages Fonctionnalités, En images et Installer — 5 novembre 2026

- Introductions unifiées avec le dégradé sauge, le quadrillage discret, la typographie DM Sans et les actions anthracite de l’accueil. Styles limités aux pages concernées dans `pages.css`.
- Fonctionnalités : aperçu accompagné d’une explication, catégories numérotées et cartes illustrées par des icônes distinctes. Multi-serveur et multi-utilisateur explicités dans la cinquième catégorie.
- Galerie : cadres et légendes harmonisés, action d’agrandissement visible, filtres répartis en deux colonnes sur téléphone. La vue Liste utilise désormais la capture de liste existante ; la capture de raccourcis est présentée comme telle. Les futurs visuels fournis par le propriétaire restent attendus.
- Installation : prérequis en trois points, sommaire court, étapes encadrées, distinction compte FriRSS / identifiants FreshRSS et adresse locale copiable. Configuration du réseau privé disponible dans un volet dépliable au clavier. Exemples de commandes conservés à la version vérifiée 1.7.0.
- Liens directs vers la démo et l’installation en fin de parcours des pages Fonctionnalités et Galerie. Traductions françaises et anglaises synchronisées.

### Navigation simplifiée et tuiles — 5 novembre 2026

À la demande du propriétaire, suppression de la page Galerie FR/EN, de ses routes et de ses liens ; les captures restent sur l’accueil, accessible par l’ancre `#apercus`. La personnalisation renvoie à la catégorie correspondante des fonctionnalités. Les liens Démo des menus ordinateur/mobile et du pied de page ouvrent directement la démo officielle dans un nouvel onglet.

Survol des tuiles Fonctionnalités : élévation de 5 px, dégradé en fondu, ombre et rotation légère de l’icône. Effets réservés aux pointeurs précis avec survol ; aucun déplacement avec réduction des mouvements. Les cartes restent du contenu, sans faux bouton ni tabulation ajoutée.

### Ressources et hébergement — 5 novembre 2026

- Ressources reprend l’introduction en dégradé quadrillé et les actions anthracite. Neuf liens conservés, regroupés en trois parcours numérotés : installer/configurer, comprendre/suivre, échanger/participer. Cartes blanches avec icônes et survol, puis encart d’hébergement et soutien au projet.
- Les explications d’hébergement détaillées vivent dans Installer, section `#hosting`, accessible depuis Ressources, le sommaire d’installation et la carte Docker des fonctionnalités. SQLite intégré, Redis côté FriRSS et PostgreSQL côté FreshRSS sont distingués avec usages, statut facultatif et liens officiels.
- Version FR/EN complète ; cartes empilées sur téléphone et schéma d’architecture décoratif en appui au texte.

### Dernier tour mobile et tablette — 5 novembre 2026

- Mentions et lien PostgreSQL retirés du site dans les deux langues à la demande du propriétaire. Hébergement recentré sur SQLite intégré et Redis recommandé/facultatif ; schéma Ressources limité au lien FriRSS–FreshRSS.
- Sur tablette, une dernière tuile isolée occupe toute la rangée ; la dernière entrée du sommaire d’installation suit la même règle sur petit écran.
- Ancienne page Démo harmonisée avec les introductions en dégradé. Panneau de copie des identifiants retiré, bouton externe conservé et indication du panneau de remplissage sur la vraie page de connexion. Capture remplacée par la vue Liste déjà disponible. Le menu continue d’ouvrir directement la démo externe.

### Direction éditoriale — 5 novembre 2026

À la suite du retour sur le manque de cohérence et de relief, nouvelle composition commune dans `src/styles/direction.css` : papier chaud, sauge plus dense, titres anthracite et surfaces sombres ponctuelles. Les valeurs de cette direction remplacent les choix visuels décrits plus haut ; contenus et parcours validés sont conservés.

- Accueil : grand slogan en deux lignes, explication et démo regroupées, capture en chevauchement avec l’introduction, repères de chapitre uniformes. Partie mobile anthracite, exemple de résultat IA sombre, invitation finale composée en deux colonnes. Ombres réservées aux images et objets qui ont besoin de relief.
- Fonctionnalités : titres de catégories à gauche, accompagnant le défilement sur ordinateur, détails en deux colonnes à droite. Ressources : répertoire de liens en lignes séparées, sans neuf cartes répétitives. En-têtes et surfaces des pages Installation et Démo harmonisés.
- Tablette : lecture et IA sur une colonne lorsqu’une composition côte à côte devient trop étroite. Téléphone : ordonnancement texte puis visuel, légendes stables, petits textes aérés. Alignement à gauche des paragraphes de présentation pour éviter les espaces irréguliers de la justification.
- Mouvement : courtes entrées au défilement sans masquer le contenu, ouverture légère des échantillons de thèmes au survol, retours des liens et tuiles. Réduction des mouvements respectée. Animations des boutons Installer et étoile conservées.
- Références consultées visuellement : [Linear](https://linear.app/features), [Readwise Reader](https://readwise.io/read), [Raycast](https://www.raycast.com/). Principes retenus : hiérarchie, échelle des visuels, surfaces contrastées ; aucun code ou visuel tiers importé.

### Découverte immersive — 5 novembre 2026

Direction approfondie à partir de [Readwise Reader](https://readwise.io/read) : produit au premier plan, grandes surfaces contrastées, visuels superposés et découverte interactive. Aucun code ni visuel tiers importé.

- Ouverture anthracite avec lumière menthe, slogan centré et composition ordinateur/téléphone. Les cinq vues réelles restent disponibles. Mouvement décoratif discret au défilement normal, suspendu hors écran.
- Navigation de chapitre active, progression dans l’en-tête et transitions natives courtes entre les pages compatibles. Pas de capture du défilement ni de routeur supplémentaire ; navigation classique en repli.
- Lecture : comparaison interactive grille/liste/colonnes dans un cadre stable. Personnalisation : aperçu illustratif manipulable avec trois ambiances et une taille de texte réglable. Les commandes restent au même endroit pendant la manipulation ; aucun réglage n’est enregistré ou envoyé.
- Pages secondaires avec introductions sombres harmonisées ; lecture sur papier clair, séquences mobile et invitation finale sombres. Paragraphes alignés au départ pour éviter les espaces irréguliers sur petits écrans.
- Commandes utilisables au clavier, états annoncés et animations désactivées selon la préférence système. Sans JavaScript, les illustrations et contenus essentiels restent disponibles. Pas de nouvelle dépendance.
