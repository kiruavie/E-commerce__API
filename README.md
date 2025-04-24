# E-commerce\_\_API

📦 1. Tech Stack suggéré
Backend : Node.js + Express

Base de données : PostgreSQL (avec Sequelize ORM par exemple)

Authentification : JWT (token d'accès + refresh token)

Paiement : Stripe API

Environnement : Postman pour tester l'API au début.

---

🛠 2. Features (API Endpoints)
Authentification
POST /auth/register — créer un compte

POST /auth/login — connecter un utilisateur et recevoir des tokens

POST /auth/refresh — renouveler un token d'accès

Produits
GET /products — voir tous les produits

GET /products/:id — voir un produit spécifique

Admin seulement :

POST /products — ajouter un produit

PUT /products/:id — mettre à jour un produit

DELETE /products/:id — supprimer un produit

Panier (Cart)
GET /cart — voir son panier actuel

POST /cart/add — ajouter un produit au panier

POST /cart/remove — retirer un produit du panier

Paiement (Checkout)
POST /checkout — procéder au paiement (Stripe)

---

🗂 3. Modèle de données (base de données)

User
id
prenom
email
mot de passe (hashé)
rôle (user ou admin)
date de création

Product
id
nom
description
prix
disponible (quantité disponible)
image (URL)

Cart
id
user_id (clé étrangère)
total_price
statut (active, completed, cancelled)

CartItem
id
cart_id (clé étrangère)
product_id (clé étrangère)
quantité
sous_total (prix \* quantité)

Order (optionnel si tu veux un historique)
id
user_id
montant total
statut (payé, en attente, etc.)
données de paiement (stripe session id)

OrderItem
order_id (clé étrangère vers Order)
product_id (clé étrangère vers Product)
quantité
prix_unitaire

---

4.  Grandes étapes

Mettre en place l'authentification (Register/Login avec JWT).

CRUD complet pour les produits (Admin seulement pour créer/éditer/supprimer).

Gérer un panier par utilisateur (un utilisateur = un panier actif).

Implémenter l'intégration Stripe pour payer le contenu du panier.

Créer un système d'autorisation pour distinguer les users et les admins.

(Facultatif) Gestion du stock après achat (décrémenter la quantité disponible).

⚡ Tips importants
Utilise middlewares pour sécuriser les routes (authMiddleware, adminMiddleware).

Fais de la validation sur toutes les entrées utilisateurs (ex: express-validator).

Utilise des transactions pour tout ce qui modifie plusieurs tables d'un coup (exemple : payer → valider l'achat + vider le panier + mettre à jour le stock).

---

🏗️ Plan d'architecture de ton projet

ecommerce-api/
│
├── config/
│ └── database.js # Configuration de Sequelize ou PostgreSQL
│ └── stripe.js # Configuration de Stripe
│
├── controllers/
│ └── auth.controller.js # Inscription, Connexion, Refresh Token
│ └── product.controller.js # CRUD produits
│ └── cart.controller.js # Ajouter, enlever, voir le panier
│ └── checkout.controller.js# Paiement via Stripe
│ └── admin.controller.js # Gérer stock, commandes, produits (admin)
│
├── middlewares/
│ └── authMiddleware.js # Vérifier le token JWT
│ └── adminMiddleware.js # Vérifier que c'est un admin
│ └── errorMiddleware.js # Gérer les erreurs globales
│ └── validateMiddleware.js # Valider les inputs utilisateurs
│
├── models/
│ └── user.model.js # Modèle User
│ └── product.model.js # Modèle Product
│ └── cart.model.js # Modèle Cart
│ └── cartItem.model.js # Modèle CartItem
│ └── order.model.js # (optionnel) Modèle Order
│
├── routes/
│ └── auth.routes.js # Routes Auth (register, login, refresh)
│ └── product.routes.js # Routes Produits
│ └── cart.routes.js # Routes Panier
│ └── checkout.routes.js # Routes Paiement
│ └── admin.routes.js # Routes Admin
│
├── utils/
│ └── tokenUtils.js # Générer / vérifier les JWT
│ └── stripeUtils.js # Créer session Stripe
│
├── app.js # Fichier principal Express
├── server.js # Lance le serveur
├── .env # Variables d'environnement (clé Stripe, JWT_SECRET, DB info)
├── package.json
└── README.md

---

Installation des packages necessaires :
npm i express dotenv bcryptjs cors cookie-parser express-validator jsonwebtoken pg pg-hstore sequelize nodemon sequelize-cli

https://roadmap.sh/projects/ecommerce-api
