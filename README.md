# Portfolio Sofiane TAREB - React + Vite

Portfolio personnel en Single Page Application, construit avec React et Vite.

Le site conserve une navigation par URL:
- /
- /experiences
- /education
- /projects
- /contact

Le rendu est alimenté dynamiquement par des fichiers JSON pour les sections principales.

## Stack technique

- React 19 + React Router (SPA + routing client)
- Vite (build + dev server)
- Tailwind CSS (compilé au build, plus de CDN)
- AOS (animations au scroll)
- Boxicons
- EmailJS pour le formulaire de contact
- Netlify pour le déploiement

## Fonctionnalités

- SPA React avec navigation par URL (React Router)
- Bilingue français/anglais avec sélecteur de langue persistant
- Données dynamiques chargées depuis public/data (FR à la racine, EN dans public/data/en)
- Modales de détail accessibles (focus piégé, touche Echap) pour formations, expériences et projets
- Thème clair/sombre avec persistance
- Formulaire de contact connecté à EmailJS
- SEO complet: meta description, Open Graph, Twitter Cards, canonical, JSON-LD, sitemap.xml, robots.txt
- Page 404 dédiée et redirections des anciennes URLs .html

## Structure du projet

- index.html: shell SEO de la SPA (meta description, Open Graph, Twitter Cards, canonical, favicon)
- src/main.jsx: point d'entrée React (providers langue + données, preloader)
- src/App.jsx: layout, routing, thème clair/sombre, AOS, page d'erreur
- src/context/LanguageContext.jsx: langue active (fr/en), persistance, traductions
- src/context/DataContext.jsx: chargement des JSON selon la langue
- src/lib/i18n.js: libellés d'interface FR/EN
- src/lib/api.js: accès aux données et helpers
- src/components: Navbar, Footer, Hero, cartes, modale accessible, formulaire...
- src/pages: une page par route + page 404
- src/index.css: directives Tailwind
- src/style.css: styles personnalisés
- public/data: contenus JSON en français (source unique de vérité)
- public/data/en: mêmes contenus traduits en anglais (profile, education, experiences, projects)
- public/data/skill-icons.json: correspondance compétence -> icône (clés FR et EN)
- public/images: images
- public/files: fichiers téléchargeables
- netlify.toml: build + redirects Netlify

## Installation locale

1. Installer les dépendances:

```bash
npm install
```

2. Configurer les variables d'environnement dans .env:

```env
VITE_EMAIL_JS=your_emailjs_public_key
```

3. Lancer le serveur local:

```bash
npm run dev
```

4. Ouvrir l'URL affichée par Vite (par défaut http://localhost:5173).

## Scripts npm

```bash
npm run dev      # développement
npm run build    # build production (dossier dist)
npm run preview  # prévisualisation du build
```

## Variables d'environnement

Le projet utilise:

- VITE_EMAIL_JS: clé publique EmailJS (public key)

Important:
- Les variables Vite doivent commencer par VITE_.
- Ne jamais stocker de clé privée dans le front.

## Déploiement Netlify

Le fichier netlify.toml est déjà configuré:

- commande de build: npm run build
- dossier publié: dist
- redirection SPA: /* -> /index.html (status 200)

Étapes:

1. Connecter le repo à Netlify.
2. Ajouter la variable d'environnement VITE_EMAIL_JS dans Site settings > Environment variables.
3. Lancer le deploy.

## Personnaliser le contenu

Tout le contenu vient de public/data (aucune donnée en dur dans le code React):

- profile.json: identité, hero (photo hero.image), à propos, services, contact, réseaux sociaux, CV (cv.path), config EmailJS, SEO (français)
- education.json, experiences.json, projects.json, skills.json: contenus français
- public/data/en/: mêmes fichiers traduits en anglais (profile, education, experiences, projects)
- skill-icons.json: correspondance compétence -> icône Boxicons (clés FR et EN)

Les libellés d'interface (navigation, boutons, messages du formulaire) sont dans src/lib/i18n.js.

Le CV proposé au téléchargement suit la langue du site: cv.path de public/data/profile.json pointe vers le CV français et celui de public/data/en/profile.json vers le CV anglais. Placez les deux PDF dans public/files.

La photo de profil du hero est définie par hero.image (chemin relatif depuis public).

Le copyright du footer affiche l'année écrite dans profile.json (footer.copyright), volontairement fixee a 2024.

Les images et documents associés doivent être placés dans:

- public/images
- public/files

Utiliser des chemins relatifs depuis public, par exemple:

- images/mon-image.jpg
- files/mon-cv.pdf

Important SEO: mettre à jour l'URL réelle du site dans:
- public/data/profile.json (champ site.url)
- public/sitemap.xml
- public/robots.txt
- index.html (canonical + og:url)

## Dépannage rapide

- Le formulaire n'envoie rien:
	- vérifier VITE_EMAIL_JS dans .env (local) ou Netlify.
- Une route affiche 404 en production:
	- vérifier que netlify.toml contient bien la redirection SPA.
- Un visuel ne s'affiche pas:
	- vérifier le chemin dans les JSON et la présence du fichier dans public.

## Licence

Usage personnel et portfolio.
