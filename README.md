# bts.gradeseducation.fr

Sous-site statique consacré aux BTS, conçu comme une verticale de `Grades Education`.

## Pages créées

- `index.html`
- `referentiels/index.html`
- `referentiels/bts-assurance.html`
- `referentiels/bts-systemes-numeriques.html`
- `methodologie/index.html`
- `methodologie/ccf-vs-ponctuel.html`
- `methodologie/reconstitution-des-criteres.html`
- `cas-d-usage/index.html`
- `ressources/index.html`
- `ressources/webinaire-19-mai-2026.html`
- `demo/index.html`
- `faq/index.html`
- `a-propos/index.html`
- `conformite/index.html`
- `conformite/rgpd.html`
- `conformite/ai-act.html`
- `conformite/nis2.html`
- `mentions-legales/index.html`

## Style

Le site reprend l'esprit de `gradesedu.io` :

- fond sombre en dégradé
- hiérarchie éditoriale serif + sans-serif
- accent bordeaux
- cartes translucides
- navigation simple et conversion visible

## Déploiement

Déployer le contenu du dossier comme racine du sous-domaine `bts.grades-education.fr`.

Le formulaire `demo/index.html` poste vers `/webhook/bts-demo-request` et s'appuie sur le workflow n8n documente dans `infra/n8n/bts-demo-request.workflow.json`.

Une configuration nginx de reference est fournie dans `infra/nginx/bts.grades-education.fr.conf`.
