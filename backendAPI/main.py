from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
import json
import os
import stripe
from fastapi import Request


# Modèle de personnage
class Personnage(BaseModel):
    nom: str
    univers: str

# Initialisation de l'application FastAPI
app = FastAPI()

# Configuration CORS


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://localhost:5173",  # ton frontend en développement
    "http://127.0.0.1:5173",  # si tu utilises cette adresse
    "http://localhost:8080",
    # tu peux ajouter d'autres URLs ici si besoin
]

# Chemin du fichier JSON
FICHIER_PERSONNAGES = "personnages.json"

# Token attendu
TOKEN_SECRET = "mytoken123"

# Fonction pour charger les personnages depuis le fichier JSON
def charger_personnages() -> List[Personnage]:
    if not os.path.exists(FICHIER_PERSONNAGES):
        return []
    with open(FICHIER_PERSONNAGES, "r", encoding="utf-8") as f:
        donnees = json.load(f)
    return [Personnage(**p) for p in donnees]

# Fonction pour sauvegarder les personnages dans le fichier JSON
def sauvegarder_personnages(personnages: List[Personnage]):
    with open(FICHIER_PERSONNAGES, "w", encoding="utf-8") as f:
        json.dump([p.dict() for p in personnages], f, indent=2, ensure_ascii=False)

# Fonction utilitaire pour vérifier le token
def verifier_token(token: Optional[str]):
    if token != TOKEN_SECRET:
        raise HTTPException(status_code=401, detail="Token invalide ou manquant.")

# GET /personnages
@app.get("/personnages", response_model=List[Personnage])
def get_personnages(token: Optional[str] = Header(None)):
    verifier_token(token)
    return charger_personnages()

# POST /personnages
@app.post("/personnages", response_model=Personnage)
def ajouter_personnage(personnage: Personnage, token: Optional[str] = Header(None)):
    verifier_token(token)
    personnages = charger_personnages()
    if any(p.nom == personnage.nom for p in personnages):
        raise HTTPException(status_code=400, detail="Un personnage avec ce nom existe déjà.")
    personnages.append(personnage)
    sauvegarder_personnages(personnages)
    return personnage

# PUT /personnages/{nom}
@app.put("/personnages/{nom}", response_model=Personnage)
def modifier_personnage(nom: str, personnage_modifie: Personnage, token: Optional[str] = Header(None)):
    verifier_token(token)
    personnages = charger_personnages()
    for index, p in enumerate(personnages):
        if p.nom == nom:
            personnages[index] = personnage_modifie
            sauvegarder_personnages(personnages)
            return personnage_modifie
    raise HTTPException(status_code=404, detail="Personnage non trouvé.")

# DELETE /personnages/{nom}
@app.delete("/personnages/{nom}")
def supprimer_personnage(nom: str, token: Optional[str] = Header(None)):
    verifier_token(token)
    personnages = charger_personnages()
    personnages_restants = [p for p in personnages if p.nom != nom]
    if len(personnages_restants) == len(personnages):
        raise HTTPException(status_code=404, detail="Personnage non trouvé.")
    sauvegarder_personnages(personnages_restants)
    return {"message": f"Personnage '{nom}' supprimé avec succès."}

# GET /personnages/exemple — liste statique
@app.get("/personnages/exemple", response_model=List[Personnage])
def get_personnages_exemple(token: Optional[str] = Header(None)):
    verifier_token(token)
    exemples = [
        Personnage(nom="Naruto Uzumaki", univers="Naruto"),
        Personnage(nom="Tony Stark", univers="Marvel"),
        Personnage(nom="Rick Sanchez", univers="Rick et Morty")
    ]
    return exemples


WEBHOOK_SECRET = "whsec_ccc17a75390abf53ccaeb4bab7d49e54abe61da09b1932240ba684a5c9852c8f"    # Clé du webhook Stripe

# Webhook Stripe
@app.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, WEBHOOK_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Payload invalide")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Signature invalide")

    # Gère l'événement Stripe ici
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print("Paiement réussi pour le client :", session["customer_email"])

    return {"status": "success"}

