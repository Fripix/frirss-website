# Vie privée et mesure d’audience

Recherche et décisions techniques du 29 octobre 2026. Ce document prépare une validation ; il ne garantit pas la conformité juridique.

## État livré

Site statique, **aucun analytics actif**, aucun événement, cookie, localStorage, sessionStorage, IndexedDB, service worker, formulaire, vidéo embarquée, publicité ou widget. Polices et images locales. Les liens externes sont ordinaires, avec politique de référent `no-referrer`. La copie au presse-papiers n’a lieu qu’au clic. L’état des menus, des onglets de disposition et de l’aperçu des thèmes ne quitte pas la mémoire de la page.

L’interface FriRSS montrée sur le site est reproduite en HTML avec des contenus d’exemple : elle ne charge aucune image ni ressource d’un éditeur tiers. La démo ne se charge qu’après navigation volontaire et a ses propres traitements.

Le navigateur envoie nécessairement des requêtes au serveur. Les journaux du futur hébergeur, leur localisation et conservation restent à établir. Les tests sur localhost ne permettent pas d’attester le comportement d’un futur CDN ou hébergeur.

## Comparaison et recommandation

| Solution          | Atouts                                                               | Limites pour ce brief                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Umami             | Simple, auto-hébergé, PostgreSQL                                     | Identifiant dérivé IP + User-Agent + site + sel mensuel. Ne répond pas à l’interdiction de reconnaissance/fingerprinting par le seul fait de ne pas utiliser de cookies. |
| Matomo On-Premise | Réglages précis, anonymisation, purge, contrôle de la reconnaissance | Maintenance PHP + SQL + archivage ; réglages standard trop étendus.                                                                                                      |
| GoatCounter       | Binaire autonome, SQLite possible                                    | Sessions fondées par défaut sur IP + User-Agent ; Sessions doit être désactivé. Option plus légère si seuls les volumes de pages suffisent.                              |

**Retenu pour l’adaptateur préparatoire : Matomo On-Premise**, uniquement sous configuration restrictive validée. Aucune installation du service. Les pages vues sont privilégiées ; renoncer aux visiteurs uniques et aux sessions est cohérent avec l’absence de reconnaissance individuelle.

Sources officielles : [Umami : métriques](https://docs.umami.is/docs/metric-definitions), [installation](https://docs.umami.is/docs/install), [GoatCounter : sessions](https://www.goatcounter.com/help/sessions), [auto-hébergement](https://github.com/arp242/goatcounter/blob/main/README.md).

## Conditions d’activation

L’adaptateur `src/components/Analytics.astro` est centralisé. Il ne charge aucun tracker tant que `PUBLIC_ANALYTICS_ENABLED` n’est pas `true`. Si activé sans `PUBLIC_ANALYTICS_REVIEWED=true`, URL HTTPS propre ou identifiant numérique, le build échoue.

Ces indicateurs signifient qu’une revue **a effectivement eu lieu**, pas qu’il suffit de les passer à true :

1. Configurer Matomo côté serveur pour **randomiser config_id à chaque requête**, sans liaison des actions d’une personne. Le site ne peut pas vérifier automatiquement ce paramètre distant.
2. Anonymiser les IP avant stockage, désactiver les profils/journaux visiteurs accessibles et tous les modules non nécessaires. Pas de User ID, suivi inter-domaines, heatmap, enregistrement de session, publicité ni Tag Manager.
3. Définir et tester purges et sauvegardes. Proposition à valider : détails 30 jours, agrégats 13 mois, plutôt que conserver jusqu’aux plafonds possibles.
4. Documenter responsable, hébergement, pays, sous-traitants/transferts, base juridique, analyse de nécessité et droits. Vérifier les pays réellement visés, sans transposer automatiquement la règle française à la Suisse.
5. La page publique Confidentialité a été retirée à la demande du propriétaire. Toute activation ultérieure d’analytics nécessite une nouvelle revue de l’information à fournir aux visiteurs. Prévoir un moyen d’opposition adapté et accessible. DNT et GPC sont déjà respectés par le module.
6. L’adaptateur autorise uniquement l’origine Matomo configurée dans la CSP ; tester le service indisponible, inspecter les requêtes et vérifier l’absence de stockage/identification.
7. Renseigner les quatre variables de `.env.example`, reconstruire et refaire les tests. Les tests de non-collecte livrés doivent rester exécutés pour le profil par défaut ; créer un profil d’audit séparé pour l’intégration volontairement activée.

Le code appelle `disableCookies` et `disableBrowserFeatureDetection` **avant** `trackPageView`. Il retire query/hash, supprime le référent et emploie un titre de page stable. Aucun événement de clic, URL externe complète, texte libre ni identifiant utilisateur n’est envoyé. Le script est asynchrone après chargement ; son indisponibilité n’empêche pas la navigation.

La désactivation de la détection navigateur **ne suffit pas** sans randomisation serveur. Sources : [cookies](https://matomo.org/faq/general/faq_157/), [détection](https://matomo.org/faq/how-to/how-do-i-disable-browser-feature-detection-completely/), [randomisation config_id](https://matomo.org/faq/how-to/how-to-randomise-the-visitor-config_id-for-privacy/), [réglages de confidentialité](https://matomo.org/faq/general/configure-privacy-settings-in-matomo/).

Les clics démo/GitHub/installation/soutien ne sont pas instrumentés. Leur nécessité et leur périmètre devront être examinés séparément si souhaités. Le faible volume de données prime sur l’exhaustivité des métriques.

## Cadre réglementaire étudié

- **RGPD** : finalité, minimisation, transparence, base juridique et droits pour les données personnelles. Une exemption de consentement ePrivacy ne dispense pas de cette analyse. [Texte officiel, notamment article 6](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016R0679).
- **ePrivacy** : l’article 5(3) concerne l’accès/stockage dans le terminal au-delà des seuls cookies. Évaluer les caractéristiques réellement lues et les règles nationales. [Lignes directrices du CEPD](https://www.edpb.europa.eu/system/files/2025-02/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_fr.pdf).
- **France / CNIL** : mesure pour le seul compte de l’éditeur, limitée à la mesure d’audience, statistiques anonymes, sans recoupement ni suivi entre sites. La démarche actuelle est une auto-évaluation, pas une certification de l’outil. [Règles et auto-évaluation](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience).
- La recommandation CNIL consolidée indique notamment 13 mois pour les traceurs et un maximum de 25 mois pour les informations collectées, avec réexamen. Ce sont des bornes, pas une durée à adopter automatiquement. [Recommandation consolidée janvier 2026](https://cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf).
- **Suisse** : LPD et art. 45c LTC, transparence, proportionnalité, information et possibilité de refus des techniques concernées. Examiner données, profilage et anonymisation effectifs. [Guide et conseils du PFPDT](https://www.edoeb.admin.ch/fr/cookies-conseils-pratiques).

L’architecture actuelle réduit les motifs d’une bannière en évitant les traitements concernés. Elle ne masque aucun consentement requis. En cas de doute futur, conserver la fonctionnalité désactivée.
