# Préparer une publication — aucune effectuée

## Choix adaptés au build livré

Le projet produit uniquement HTML/CSS/JS/images dans `dist/`, sans fonction serveur ni état applicatif. Aucun conteneur n’est requis pour le site.

| Option                                         | Adaptation au projet                                                                                      | Point à examiner                                                                                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hébergement statique/Nginx sous votre contrôle | Recommandation si maîtrise des journaux, pays et configuration prioritaire ; simple copie de `dist/`      | Maintenance TLS, cache, sauvegarde de la configuration et politique des logs                                                                       |
| Cloudflare Pages                               | Bonne option si maintenance minimale et CDN prioritaires ; build `npm ci && npm run build`, sortie `dist` | Sous-traitance/transferts et logs ; désactiver toutes injections analytics/Zaraz ; aucune utilisation ici                                          |
| GitHub Pages                                   | Adapté à un site open source lié à son dépôt ; fichiers statiques et domaine personnalisé                 | Configurer `BASE_PATH` pour un site de projet, ajout `.nojekyll`, moindre maîtrise des en-têtes ; GitHub indique conserver les IP pour la sécurité |

Sources officielles consultées : [Astro sur Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [GitHub Pages et collecte de données](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [sortie statique Astro](https://docs.astro.build/en/reference/configuration-reference/#output).

Un serveur statique dans Docker reste possible mais n’apporte rien au frontend ; aucun Dockerfile de déploiement n’est nécessaire à cette phase. Aucun tarif, région ou abonnement n’est présumé.

## Avant de publier

1. Obtenir l’accord explicite du propriétaire pour la création/publication de `Fripix/frirss-website`, le choix d’hébergement et toute intervention externe.
2. Pas de mentions légales : le propriétaire les juge inutiles (11 novembre 2026). Le site n’affiche aucune identité et ne collecte rien ; la page Confidentialité a aussi été retirée à sa demande.
3. Garder analytics désactivé, sauf revue séparée conforme à `PRIVACY.md`.
4. Définir `SITE_URL=https://domaine-reel` et `BASE_PATH=/` (ou sous-répertoire). Le domaine de la démo ne doit pas être utilisé par défaut comme domaine du site.
5. Après validation, `PUBLIC_SITE_READY=true`. Le layout refuse une génération indexable avec une URL locale ou non HTTPS.
6. `npm run publication:check`, `npm run check`, `npm run test:unit`, `npm run build`, `npm test`. Tester le build sous l’URL et le sous-chemin cibles.
7. Configurer HTTP : `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `X-Frame-Options: DENY` ou CSP HTTP `frame-ancestors 'none'`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Activer HSTS seulement sur un domaine HTTPS maîtrisé. Le site fournit déjà une CSP par balise meta calculée par Astro ; `frame-ancestors` doit être un **en-tête HTTP**, pas une meta.
8. Cache : HTML à revalider, fichiers hashés `/_astro/` longue durée immutable, autres fichiers à renouveler. Servir les vraies 404 ; ne pas transformer toute URL inconnue en accueil avec statut 200.
9. Vérifier canoniques, hreflang, sitemap, robots, cartes Open Graph EN/FR, certificats et journaux sur l’hébergement retenu. Aucun SDK social nécessaire.
10. Publier uniquement après accord, puis inspecter le réseau réel, le stockage et les en-têtes. Les vérifications locales ne couvrent pas les injections de l’hébergeur.

## Maintenance

Chaque nouvelle release FriRSS : lire les notes, vérifier les commandes et éventuelles limitations, actualiser le contenu dans les deux langues, puis l’interface reproduite en HTML et les cartes sociales. Les métadonnées de version peuvent être mises à jour via `REFRESH_RELEASE=true npm run build` avec secours en cas de panne GitHub. Cette actualisation n’est pas une preuve que tout le contenu a été revu avec cette nouvelle version.

Mises à jour npm : branche dédiée, lockfile, contrôles et tests navigateurs. Dependabot prépare les propositions, sans fusion automatique. Ajouter une langue selon `I18N.md` et prévoir une relecture humaine.
