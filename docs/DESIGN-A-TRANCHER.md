# Points à trancher

Liste tenue à part de la [charte](DESIGN.md). Hors de la section « Déjà tranché », chaque ligne attend le choix du propriétaire. Une fois tranchée, une ligne passe dans la charte ou disparaît.

État au 11 novembre 2026, après la passe de finitions (branche `polish/finitions`).

## En attente

| #   | Sujet                                | Où regarder              | Choix attendu                                                                                                                                                       |
| --- | ------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Logo de FreshRSS dans le comparateur | [SOURCES.md](SOURCES.md) | Aucune licence ni règle d’usage n’est publiée pour ce logo : demander l’accord des mainteneurs, ou garder l’icône générique. Voir « FreshRSS dans le comparateur ». |
| 2   | Tests sous Firefox                   | [QA.md](QA.md)           | Le Firefox de Playwright ne démarre pas sur ce Mac. Les View Transitions restent à vérifier à la main dans Firefox.                                                 |

## Déjà tranché

- **Structure de l’accueil** (11 novembre 2026) : la structure actuelle est gardée. Seul emprunt à l’alternative B : les questions toutes visibles, sur deux colonnes, sans volets ; l’en-tête de la FAQ n’est donc plus collant. Le pied de page en colonnes et la tuile « FriRSS vous plaît ? » restent. La planche des deux structures est retirée.
- **Titre du hero et tuiles de fonctionnalité** (11 novembre 2026) : gardés tels quels, par choix du propriétaire. La charte les note comme voulus ; ce n’étaient pas des écarts à ses refus (qui visent les sections arrondies et les encarts autour des captures), et la règle « titres en deux tons » venait de moi.
- **Contradictions entre l’ancienne « Identité » et le site** (14 points) : tranchées le 11 novembre 2026. Le site a raison sur douze points, déjà décrits par la charte. Deux retouches faites : le commentaire de `system.css` sur la barre du haut, et le bouton Étoile de la barre porté de 40 à 44 px. Deux exceptions acceptées et écrites dans la charte : les éléments collants d’Installer et de la FAQ, et la bande des fonctionnalités sur deux écrans.
- **Textes en miroir** : réécrits le même jour (titres d’Installer, de Ressources et de Fonctionnalités, appel final de Fonctionnalités, pied de page, trois titres d’onglet) ; le titre des fonctionnalités de l’accueil est en un seul ton. Le slogan « Votre FriRSS, vos règles. » reste à l’appel final de l’accueil, seul.
- **Tics** : point qui pulse supprimé ; schéma à icônes remplacé par le comparateur ; coches, pastilles numérotées et flèche dans un rond remplacées (choix A1, B1, C1). Les deux coches d’état d’Installer sont gardées, comme exception écrite dans la charte.
- **Animations** : entrée du hero, entrées au défilement (une fois par élément), ouverture de la FAQ, survols et appuis sont gardés. La pluie des petits boutons Étoile est supprimée.
- **Tuile « Se pilote au clavier »** : elle se repose sur la palette entière.
- **Comparateur sous 640 px** : une interface en pleine largeur et une bascule FreshRSS / FriRSS.

## Le mouvement tel qu’il est

Rien d’automatique ne dure plus de 5 s et il n’y a aucun bouton pause. Avec « réduire les animations » : état final statique, aucune animation.

| Mouvement                     | Où                                                                                            | Déclencheur                                             | Durée                |
| ----------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------------- |
| Entrée du hero                | `hero-rise`, `hero-window` (`home.css`)                                                       | Chargement, une fois                                    | 0,9 s et 1,1 s       |
| Articles qui arrivent         | `row-open`, `row-flash` ; `motion.ts`                                                         | Hero à l’écran : deux arrivées, puis repos              | Terminé avant 5 s    |
| Entrées au défilement         | `[data-reveal]` (`motion.css`)                                                                | Défilement, une fois par élément                        | 0,8 à 1 s            |
| Tuile « article complet »     | `full-rss`, `full-btn`, `full-label`, `full-extracting`, `full-body`                          | Entrée à l’écran, survol, focus clavier dans la section | 2 × 2,35 s           |
| Tuile « au clavier » (⌘K)     | `palette-placeholder`, `palette-type`, `palette-filter`, `palette-select`, `palette-unselect` | Idem                                                    | 2 × 2,35 s           |
| Tuile « appui long »          | `picker-press`, `picker-menu`                                                                 | Idem                                                    | 2 × 2,35 s           |
| Tuile « résume et traduit »   | `ai-write`, `ai-spark`                                                                        | Idem                                                    | 2 × 2,35 s           |
| Tuile étoile de l’appel final | `star-shower`                                                                                 | Idem                                                    | 4,65 s au plus       |
| Barre du comparateur          | `compare.ts`                                                                                  | Cadre à l’écran, une fois (à partir de 640 px)          | 1,1 s                |
| Changement de disposition     | View Transition, sinon `view-in`                                                              | Clic sur un onglet                                      | 320 ms, sinon 460 ms |
| Changement de thème           | View Transition, sinon transition de couleur                                                  | Clic sur un thème                                       | 300 ms, sinon 420 ms |
| Survols et appuis             | boutons, liens, tuiles, téléphones                                                            | Survol, appui                                           | 140 à 600 ms         |

Le skill `review-animations` ne peut être lancé que par le propriétaire (`/review-animations`) : cet inventaire a été fait à la main.
