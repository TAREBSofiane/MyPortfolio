# Portfolio Static Site

Ce dossier contient la version statique de votre portfolio, convertie du site Flask original vers un site HTML/CSS/JavaScript pur.

## 📁 Structure des fichiers

```
static-site/
├── index.html          # Page d'accueil
├── projects.html       # Page des projets
├── experiences.html    # Page des expériences
├── education.html      # Page de l'éducation
├── contact.html        # Page de contact
├── css/
│   └── style.css      # Styles personnalisés
├── js/
│   └── main.js        # JavaScript principal
├── data/
│   ├── skills.json    # Données des compétences
│   ├── projects.json  # Données des projets
│   ├── experiences.json # Données des expériences
│   └── education.json # Données de l'éducation
├── images/           # Images du portfolio
├── files/           # Fichiers (CV, etc.)
└── README.md        # Ce fichier
```

## 🚀 Configuration du formulaire de contact

### Option 1: Formspree (Recommandé)

1. Allez sur [formspree.io](https://formspree.io) et créez un compte gratuit
2. Créez un nouveau formulaire et obtenez votre URL
3. Dans `contact.html`, remplacez cette ligne :
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="post">
   ```
   Par votre vraie URL Formspree :
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID" method="post">
   ```

### Option 2: Netlify Forms

Si vous déployez sur Netlify, ajoutez simplement `netlify` dans la balise form :
```html
<form id="contact-form" netlify name="contact" method="post">
```

### Option 3: EmailJS

1. Créez un compte sur [emailjs.com](https://www.emailjs.com/)
2. Configurez votre service d'email
3. Remplacez la fonction de soumission du formulaire dans `js/main.js`

## 🌐 Déploiement

### Netlify (Gratuit)

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier `static-site` dans l'interface Netlify
3. Votre site sera automatiquement déployé avec une URL gratuite

### Vercel (Gratuit)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez votre projet depuis GitHub ou déployez directement
3. Configuration automatique pour les sites statiques

### GitHub Pages

1. Créez un repository GitHub
2. Uploadez tous les fichiers du dossier `static-site`
3. Activez GitHub Pages dans les paramètres du repository

## ⚙️ Fonctionnalités conservées

✅ **Navigation responsive** avec menu mobile  
✅ **Mode sombre/clair** avec sauvegarde des préférences  
✅ **Chargement dynamique** des données JSON  
✅ **Filtrage des projets** par catégorie  
✅ **Animations** et effets visuels  
✅ **Formulaire de contact** fonctionnel  
✅ **Design responsive** pour tous les appareils  
✅ **SEO optimisé** avec meta tags appropriés  

## 🔧 Modification des données

### Ajouter/modifier un projet

Éditez le fichier `data/projects.json` :
```json
{
  "title": "Nouveau Projet",
  "description": "Description du projet...",
  "image": "images/nouveau-projet.jpg",
  "link": "https://github.com/username/repo",
  "technologies": ["Python", "JavaScript"],
  "category": {"id": "web", "name": "Web"}
}
```

### Ajouter/modifier une expérience

Éditez le fichier `data/experiences.json` :
```json
{
  "title": "Nouveau Poste",
  "description": "Description du poste...",
  "missions": ["Mission 1", "Mission 2"],
  "image": "images/entreprise.jpg",
  "skills": ["Compétence 1", "Compétence 2"],
  "institution": "Nom de l'entreprise",
  "period": "Date - Date",
  "link": "https://entreprise.com"
}
```

### Modifier les compétences

Éditez le fichier `data/skills.json` pour ajouter/modifier vos compétences techniques.

## 🎨 Personnalisation

### Couleurs

Les couleurs primaires sont définies dans Tailwind CSS. Pour les changer, modifiez la configuration dans chaque fichier HTML :

```javascript
colors: {
  primary: {
    50: '#eef2ff',   // Très clair
    100: '#e0e7ff',  // Clair
    500: '#6366f1',  // Couleur principale
    600: '#4f46e5',  // Couleur principale foncée
    700: '#4338ca',  // Foncé
  }
}
```

### Images

- **Photo de profil** : `images/profile.jpeg`
- **Images de projets** : `images/`
- **CV** : `files/CV_Sofiane_TAREB.pdf`

## 📱 Test en local

Pour tester le site en local, vous devez utiliser un serveur HTTP (à cause des requêtes AJAX pour charger les JSON) :

### Python
```bash
cd static-site
python -m http.server 8000
```

### Node.js
```bash
cd static-site
npx http-server
```

### VS Code Live Server
Utilisez l'extension "Live Server" dans VS Code.

## 🆘 Dépannage

### Les données ne se chargent pas
- Vérifiez que vous utilisez un serveur HTTP (pas file://)
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que les fichiers JSON sont valides

### Le formulaire ne fonctionne pas
- Vérifiez que l'URL Formspree est correcte
- Testez le formulaire après déploiement (certains services ne fonctionnent qu'en production)

### Problèmes de style
- Vérifiez que Tailwind CSS se charge correctement
- Assurez-vous que les fichiers CSS personnalisés sont présents

## 📞 Support

Si vous avez des questions ou des problèmes, n'hésitez pas à créer une issue ou me contacter directement.

---

**Félicitations ! Votre portfolio est maintenant un site statique moderne, performant et facilement déployable ! 🎉**