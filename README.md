# 🎮 API FastAPI — Gestion de Personnages + Webhook Stripe

faire deja 
cd backendAPI avant tout

Cette application FastAPI permet de gérer une liste de personnages issus de différents univers fictifs et inclut un **webhook Stripe sécurisé** pour réagir aux paiements en ligne.

## 📦 Fonctionnalités

- 🔐 Authentification simple par token pour les routes protégées
- 📁 Sauvegarde des personnages dans un fichier `JSON`
- 🔁 Webhook Stripe pour capturer les événements `checkout.session.completed`
- 🌐 CORS activé pour permettre les appels frontend

## 🧱 Technologies utilisées

- Python 3.x
- FastAPI
- Pydantic
- Stripe (SDK)
- JSON pour le stockage local

## 🚀 Lancer l'application

### 1. Installer les dépendances


```bash
pip install -r requirements.txt
```

```bash
pip install fastapi uvicorn stripe
```

### 2. Lancer le serveur

```bash
uvicorn main:app --reload
```

> `main` correspond au nom du fichier `.py` contenant l'application.

## 🔑 Authentification

Un **token** est requis dans les en-têtes des requêtes pour les routes suivantes :  
- `GET /personnages`
- `POST /personnages`
- `PUT /personnages/{nom}`
- `DELETE /personnages/{nom}`
- `GET /personnages/exemple`

Utiliser l'en-tête HTTP suivant :
```
token: mytoken123
```

## 🧙 Endpoints Personnages

| Méthode | URL                          | Description                         |
|---------|------------------------------|-------------------------------------|
| GET     | `/personnages`               | Liste les personnages (auth requise)|
| POST    | `/personnages`               | Ajoute un personnage                |
| PUT     | `/personnages/{nom}`         | Modifie un personnage               |
| DELETE  | `/personnages/{nom}`         | Supprime un personnage              |
| GET     | `/personnages/exemple`       | Donne 3 personnages d'exemple       |

## 💳 Webhook Stripe

### ➕ Endpoint

```
POST /webhook/stripe
```

### ⚙️ Configuration Stripe

1. Connecte-toi sur https://dashboard.stripe.com/
2. Va dans **Développeurs > Webhooks**
3. Crée un endpoint :  
   URL : `http://localhost:8000/webhook/stripe`  
   Événements : `checkout.session.completed` (au minimum)
4. Copie la clé **"Clé de signature secrète"** (ex: `whsec_...`)
5. Remplace la valeur de `WEBHOOK_SECRET` dans le code :

```python
WEBHOOK_SECRET = "whsec_votre_clé_secrète"
```

### 🔐 Sécurité

Stripe signe chaque événement envoyé à ton webhook. L’application vérifie cette signature pour s'assurer que la requête provient bien de Stripe.

## 🧪 Tester avec Stripe CLI (optionnel)

```bash
stripe listen --forward-to localhost:8000/webhook/stripe
```

Ensuite, déclenche un événement test :

```bash
stripe trigger checkout.session.completed
```

---

## 📁 Structure des fichiers

```
.
├── main.py               # Code FastAPI
├── personnages.json      # Stockage local des personnages
└── README.md             # Ce fichier
```

---

## 📬 Contact

Projet développé à des fins pédagogiques.
