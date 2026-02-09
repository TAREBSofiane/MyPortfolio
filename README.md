# MyPortfolio

Ce portfolio est un site web personnel statique conçu en HTML, CSS et JavaScript, avec une architecture modulaire et orientée données. Il présente mon parcours académique, mes expériences professionnelles, mes projets et mes compétences de manière claire et dynamique.

Le contenu (formations, projets, expériences, compétences) est stocké dans des fichiers JSON et chargé dynamiquement côté client via main.js, ce qui facilite la maintenance, l’évolution du contenu et la séparation entre structure, style et données.

## Architecture principale

### Pages HTML :
index.html, projects.html, education.html, experiences.html, contact.html

### Styles :
css/style.css

### Logique JavaScript :
js/main.js (chargement et affichage dynamique des données JSON)

### Données :
data/education.json, projects.json, experiences.json, skills.json

### Ressources :
- files/CV.pdf
- images/*.png
  
## Fonctionnement

Les fichiers JSON contiennent des informations structurées (titres, descriptions, dates, compétences, liens, etc.) qui sont importées dynamiquement par main.js et rendues dans les différentes pages. Cette approche permet d’actualiser le contenu sans modifier le code HTML.

## Démarrage local

Pour tester le site localement, utilisez un serveur HTTP simple :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (si http-server est installé)
npx http-server
```

Puis ouvrez votre navigateur à l'adresse : http://localhost:8000

## Déploiement

Ce site peut être déployé sur n'importe quelle plateforme d'hébergement statique :
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- etc.

## Configuration du formulaire de contact

Le formulaire de contact utilise EmailJS. Pour le configurer :
1. Créez un compte sur https://www.emailjs.com/
2. Configurez un service email
3. Créez un template d'email
4. Modifiez les IDs dans `js/main.js` (lignes avec emailjs.send)
