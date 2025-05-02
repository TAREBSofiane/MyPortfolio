import os
import json
from flask import Flask, render_template, url_for, jsonify, request, flash, redirect
from flask_mail import Mail, Message
from dotenv import load_dotenv
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf.csrf import CSRFProtect
from markupsafe import escape
import re

# Charger les variables d'environnement du fichier .env
load_dotenv()

app = Flask(__name__)

# Configuration de Flask
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
app.config['SESSION_COOKIE_SECURE'] = True  # Cookie en HTTPS seulement
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Cookie non accessible en JavaScript
app.config['DEBUG'] = False  # Désactiver le mode debug en production

# Protection CSRF
csrf = CSRFProtect(app)

# Sécurité des en-têtes avec Talisman
csp = {
    'default-src': ["'self'", "'unsafe-inline'"],
    'script-src': [
        "'self'",
        "'unsafe-inline'",
        "cdn.tailwindcss.com",
        "unpkg.com",
        "cdnjs.cloudflare.com"
    ],
    'style-src': [
        "'self'",
        "'unsafe-inline'",      # si vous avez des <style> inline
        "fonts.googleapis.com",
        "unpkg.com",
        "cdn.tailwindcss.com"
    ],
    'font-src': [
        "'self'",
        "'unsafe-inline'",
        "fonts.gstatic.com",
        "unpkg.com",
        "cdn.tailwindcss.com"
    ],
    'img-src': ["'self'", "'unsafe-inline'", "data:"],
    'connect-src': ["'self'", "'unsafe-inline'"],
}

talisman = Talisman(
    app,
    content_security_policy=csp,
    force_https=True,
    session_cookie_secure=True,
    feature_policy={
        'geolocation': "'none'",
        'camera': "'none'",
        'microphone': "'none'"
    }
)

# Configuration de Flask-Mail
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL')

mail = Mail(app)

# Charger les projets depuis JSON
def load_projects(fjson):
    path = os.path.join(app.root_path, 'data', fjson)
    # Validation du nom de fichier pour éviter la traversée de répertoire
    if not re.match(r'^[a-zA-Z0-9_-]+\.json$', fjson):
        app.logger.error(f"Tentative d'accès non autorisé au fichier: {fjson}")
        return {}
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError) as e:
        app.logger.error(f"Erreur lors du chargement du fichier {fjson}: {e}")
        return {}

@app.route('/')
def index():
    skills = load_projects('skills.json')
    return render_template('index.html', skills=skills)

@app.route('/projects')
def projects():
    data = load_projects('projects.json')
    return render_template('projects.html', projects=data)

@app.route('/experiences')
def experiences():
    data = load_projects('experiences.json')
    return render_template('experiences.html', experiences=data)

@app.route('/education')
def education():
    data = load_projects('education.json')
    return render_template('education.html', education=data)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Récupération des données avec échappement
        name = escape(request.form.get('name', '').strip())
        email = escape(request.form.get('email', '').strip())
        subject = escape(request.form.get('subject', '').strip())
        message = escape(request.form.get('message', '').strip())

        is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest' 

        # Validation
        if not all([name, email, subject, message]):
            if is_ajax:
                return jsonify({'success': False, 'message': 'Veuillez remplir tous les champs.'}), 400
            flash('Veuillez remplir tous les champs.', 'error')
            return redirect(url_for('contact'))
            
        # Validation de l'email avec regex
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            if is_ajax:
                return jsonify({'success': False, 'message': 'Adresse email invalide.'}), 400
            flash('Adresse email invalide.', 'error')
            return redirect(url_for('contact'))
        
        try:
            send_email_with_flask(name, email, subject, message)
            if is_ajax:
                return jsonify({'success': True, 'message': 'Message envoyé avec succès !'}), 200
            
            flash('Votre message a été envoyé avec succès !', 'success')
            return redirect(url_for('contact'))
        except Exception as e:
            app.logger.error(f"Erreur lors de l'envoi du mail: {e}")
            if is_ajax:
                return jsonify({'success': False, 'message': "Erreur d'envoi, réessayez."}), 500
            flash("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.", 'error')
            return redirect(url_for('contact'))
            
    return render_template('contact.html')

def send_email_with_flask(name, email, subject, message):
    """Méthode d'envoi d'email avec Flask-Mail"""
    try:
        # Vérification des limites de taille
        if len(message) > 10000:  # Limite à 10 000 caractères
            raise ValueError("Message trop long")
        
        # Mail pour le destinataire
        msg = Message(subject=f"Portfolio - {subject}", recipients=[RECIPIENT_EMAIL])
        msg.body = f"{message}\n\nNom: {name}\nEmail: {email}"
        msg.sender = email
        msg.reply_to = email
        mail.send(msg)
        
        # Accusé de réception
        confirmation = Message(subject="Accusé de réception - Sofiane TAREB", recipients=[email])
        confirmation.sender = RECIPIENT_EMAIL
        confirmation.body = f"""
Bonjour {name},

Merci d'avoir pris contact avec moi. J'ai bien reçu votre message et y répondrai dans les meilleurs délais.

Récapitulatif de votre message:
---
Sujet: {subject}
Message: {message}
---

Cordialement,
Sofiane TAREB
        """
        mail.send(confirmation)
    except Exception as e:
        app.logger.error(f"Erreur dans send_email_with_flask: {e}")
        raise

# API JSON routes avec limiteur de requêtes
@app.route('/api/projects')
def api_projects():
    return jsonify(load_projects('projects.json'))

@app.route('/api/experiences')
def api_experiences():
    return jsonify(load_projects('experiences.json'))

@app.route('/api/education')
def api_education():
    return jsonify(load_projects('education.json'))

@app.route('/api/skills')
def api_skills():
    return jsonify(load_projects('skills.json'))

# Gestionnaire d'erreurs
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

# Gestionnaire pour les erreurs de limite de requêtes
@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({"error": "Trop de requêtes, veuillez réessayer plus tard."}), 429
