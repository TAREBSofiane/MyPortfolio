# Site Portfolio Statique

Ce dossier contient la version statique du portfolio.

## Démarrage local

Pour tester le site localement, utilisez un serveur HTTP simple :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (si http-server est installé)
npx http-server

# Avec PHP
php -S localhost:8000
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
