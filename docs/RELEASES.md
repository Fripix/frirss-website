# Mettre le site à jour après une release FriRSS

Le contenu publié décrit une version vérifiée (`site.verifiedVersion`), pas automatiquement la dernière version de développement. Aucun numéro de version n’est affiché sur le site.

## À chaque release de FriRSS : `sync:check`

Le script compare le site à FriRSS et dit ce qui est à revoir. Il ne modifie ni FriRSS ni les textes du site.

```sh
# depuis ce dépôt (FriRSS dans ../FriRSS)
npm run sync:check                       # l’état de travail de FriRSS, avant le tag
npm run sync:check -- --ref v1.9.2       # un tag précis

# depuis FriRSS, dans son processus de release
node ../FriRSS-Site/scripts/sync-check.mjs --frirss .
```

Code de sortie : `0` rien à faire, `1` quelque chose à revoir, `2` le contrôle n’a pas pu tourner.

Ce qu’il vérifie :

- **Copié tel quel, comparé exactement** : les dix langues de l’interface et leurs libellés (bande « Dans votre langue », `src/data/interface-languages.json`, recopié avec `--write-languages`) ; la liste des variables d’environnement du README (page Installer, `src/config/installation.ts`).
- **Réécrit par le site, signalé pour relecture** : chaque section de `docs/FEATURES.md` et du `README.md` nouvelle, modifiée ou retirée depuis la dernière revue ; un changement de `themeStore.ts` (couleurs des rendus) ; les libellés FriRSS cités dans les rendus HTML (`src/i18n/*/reader.json`) ; la version.

La référence est `src/data/frirss-sync.json` : l’état de FriRSS lors de la dernière revue, écrit par `--accept`. Ne pas le modifier à la main.

### Pour le processus de release de FriRSS

À ajouter à la procédure de release de FriRSS (son `CLAUDE.md`), juste avant le tag :

> **Site vitrine** : lancer `node ../FriRSS-Site/scripts/sync-check.mjs --frirss .` et lire le résultat. S’il signale quelque chose (code 1), la release peut partir, mais le site doit être mis à jour ensuite dans le dépôt FriRSS-Site (méthode : `docs/RELEASES.md` de ce dépôt). Ne jamais modifier le site depuis FriRSS.

## Mettre le site à jour

1. Lancer `npm run sync:check` et garder le rapport sous les yeux.
2. Lire les notes de version qu’il cite (`CHANGELOG.md`, ou `docs/RELEASE-NEXT.md` pour une version pas encore notée), puis les sections signalées de `docs/FEATURES.md` et du README. Distinguer nouveautés disponibles, options à activer et limitations ; ne pas présenter une fonctionnalité seulement présente sur `dev`.
3. Langues : `npm run sync:check -- --write-languages`. Si leur nombre change, revoir les textes qui disent « dix langues » (`home.json`, `features.json`).
4. Fonctionnalités : actualiser `src/i18n/fr/features.json` et `src/i18n/en/features.json`, puis l’accueil et la FAQ si besoin. Les nouveaux textes sont soumis au propriétaire avant publication.
5. Installation : variables, ports, volumes et étapes de migration dans `src/config/installation.ts` et `src/i18n/*/installation.json`. Les commandes restent en `:latest`.
6. Rendus FriRSS : si des libellés, des couleurs de thème ou des écrans montrés changent, mettre à jour `src/components/reader/`, `src/styles/reader.css` et `src/i18n/*/reader.json`, puis `npm run social:images`.
7. Noter les sources et la date dans `docs/SOURCES.md`, mettre à jour `verifiedVersion` et `verifiedOn` dans `src/config/site.ts`, puis enregistrer la nouvelle référence : `npm run sync:check -- --accept` (avec `--ref vX.Y.Z` pour un tag).
8. `npm run check`, `npm run build`, puis les tests (`--workers=1`). Vérifier visuellement les pages modifiées sur ordinateur et téléphone, en français et en anglais.

`npm run release:update` lit toujours la dernière release publiée sur GitHub (`src/data/release.json`) et avertit au build si elle diffère de `verifiedVersion` ; c’est un filet, `sync:check` est l’outil de revue.

## Dernière revue

Le 5 novembre 2026, sur **v1.8.0** (API GitHub, tag et documents). Contenu FR/EN mis à jour : lecture aléatoire, taille et proportions des cartes, 38 couleurs, synchronisation hors ligne, changement des mots de passe et association explicite au SSO. Depuis la refonte du 6 novembre 2026, le site n’utilise plus de captures : l’interface est reproduite en HTML.

Le 12 novembre 2026, `sync:check` est introduit et sa référence posée sur v1.8.0. Contre v1.9.1, il signale : une nouvelle section (compteurs de Favoris, d’À lire plus tard et des étiquettes), une trentaine de sections de `FEATURES.md` modifiées, quatre sections du README (dont Configuration, sans nouvelle variable), le libellé anglais `articleList.displayMode` (« Layout » → « Density »). Langues et variables : à jour. Le même jour, contenu revu pour **v1.9.1** (détail dans `docs/SOURCES.md`), puis référence enregistrée sur v1.9.1.
