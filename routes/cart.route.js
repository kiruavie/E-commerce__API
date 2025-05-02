// routes/cart.routes.js
const express = require("express");
const CartRoutes = express.Router();
const {
  getActiveCart,
  updateCartTotal,
  completeCart,
} = require("../controllers/cart.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Récupérer le panier actif (ou en créer un s'il n'existe pas)
CartRoutes.get("/", authMiddleware, getActiveCart);

// Mettre à jour le total du panier actif
CartRoutes.put("/update-total", authMiddleware, updateCartTotal);

// Finaliser le panier actif
CartRoutes.put("/complete", authMiddleware, completeCart);

module.exports = CartRoutes;
