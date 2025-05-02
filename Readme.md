# MyPortfolio

**MyPortfolio** est une application web personnelle développée en Python avec le framework Flask. La page d’accueil présente qui je suis, ce que je fais, ainsi que mes compétences. Chaque section clé _expériences professionnelles, parcours éducatif_ et _projets_ dispose de sa propre page dédiée pour une navigation claire et structurée. Le site intègre également une page de contact avec envoi d’e-mails. Il est sécurisé à l’aide des extensions Flask-Talisman (HTTPS, en-têtes de sécurité) et CSRF pour protéger les formulaires contre les attaques intersites.

---

## Fonctionnalités principales

- Page d'accueil avec message de bienvenue, ce que je fais, qui suis-je et ce que je maitrise
- Sections _Expériences_ et _Formations_ et _Projets_ dynamiques, chargée depuis des fichiers JSON
- Formulaire _Contact_ avec envoi d'email (Flask-Mail)
- Slider / animations AOS
- Grille responsive des blocs projets, experiences et éducation :
  - Sur petits écrans, les blocs sont cachés et accessibles via un onglet
  - Sur écrans moyens et plus larges, la grille s'affiche toujours

---

## Structure du projet

```
MyPortfolio/
├──app/
|   ├── __init__.py            # Point d'entrée Flask et configuration Flask-Mail
|   ├── data/
|   |   ├── beducation.json    # Template de base
|   |   ├── iexperiences.json  # Accueil
|   |   ├── projects.json      # Section Projets
|   |   └── eskills.json       # Section Expériences
|   ├── static/
|   │   ├── css/
|   │   │   └── style.css      # Styles personnalisés
|   │   ├── js/
|   │   │   └── main.js        # Scripts JS (smooth scroll)
|   │   ├── files/
|   │   │   └── CV.pdf         # CV
|   │   └── images/            # Images des projets
|   └── templates/
|       ├── base.html          # Template de base
|       ├── index.html         # Accueil
|       ├── projects.html      # Section Projets
|       ├── experiences.html   # Section Expériences
|       ├── education.html     # Section Formations
|       └── contact.html       # Contact
├── run.py                     # Script de lancement de l'app
├── .env                       # Variables d'environnement
├── .gitignore                 # Les fichiers et dossiers à ignorer
├── requirements.txt           # Dépendances Python
└── README.md                  # Documentation du projet
```

---

## Prérequis

- Python 3.8+
- pip
- Un compte Gmail (ou autre serveur SMTP) avec un mot de passe d'application

---

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/TAREBSofiane/MyPortfolio.git
   cd MyPortfolio
   ```
2. **Créer un environnement virtuel**
   ```bash
   python -m venv .venv
   ```
3. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configurer les variables d'environnement**
   - Copier `.env` et renseigner vos identifiants SMTP et la clé secrète et tous les pré-requis
3. **Lancement**
   ```bash
   python run.py
   ```
   ou
   ```bash
   gunicorn app:app
   ```
---

- Site accessible sur <http://localhost:1997>
- Les projets, expériences, formations et compétences sont chargés depuis `data/*.json` (la structure des JSON doit être respectée)
- Le formulaire de contact envoie deux emails (au destinataire et un accusé de réception)

---

## Licence

MIT © 2025 Sofiane TAREB

---

*Bon développement !*
