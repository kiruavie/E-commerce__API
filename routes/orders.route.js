const express = require("express");
const {
  createOrder,
  getUsersOrders,
  updateOrderStatus,
} = require("../controllers/order.controller.js");
const { authMiddleware } = require("../middlewares/auth.middleware.js");

const OrderRoutes = express.Router();

OrderRoutes.get("/", authMiddleware, getUsersOrders);
OrderRoutes.post("/", authMiddleware, createOrder);
OrderRoutes.put("/", authMiddleware, updateOrderStatus);

module.exports = OrderRoutes;
