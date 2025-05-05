const express = require("express");
const CartItemRoutes = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");

const {
  addItemToCart,
  updateItemQuantity,
  deleteItemFromCart,
} = require("../controllers/cartItem.controller");

CartItemRoutes.post("/", authMiddleware, addItemToCart);
CartItemRoutes.put("/:id", authMiddleware, updateItemQuantity);
CartItemRoutes.delete("/:id", authMiddleware, deleteItemFromCart);

module.exports = CartItemRoutes;
