const db = require("../models");
const Cart = db.Cart;
const CartItem = db.CartItem;
const OrderItem = db.OrderItem;
const Order = db.Order;

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { user_id: userId, statut: "active" },
      include: [{ model: CartItem, as: "cart_items", include: ["product"] }],
    });

    if (!cart || cart.cart_items.length === 0)
      return res.status(400).json({ success: false, message: "Panier vide" });

    const montant_total = cart.cart_items.reduce(
      (sum, item) => sum + item.sub_total,
      0
    );

    const order = await Order.create({
      user_id: userId,
      montant_total,
      info_payment: req.body.info_payment || "N/A",
    });

    const orderItems = await Promise.all(
      cart.cart_items.map((item) =>
        OrderItem.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.sub_total / item.quantity,
        })
      )
    );

    cart.statut = "completed";
    await cart.save();
    await CartItem.destroy({ where: { cart_id: cart.id } });

    res.status(201).json({
      success: true,
      message: "Commande créée avec succès",
      order,
      items: orderItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUsersOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [{ model: OrderItem, as: "items", include: ["product"] }],
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { statut } = req.body;

    const validStatus = ["pending", "payed", "cancelled"];
    if (!validStatus.includes(statut)) {
      return res
        .status(400)
        .json({ success: false, message: "Statut invalide" });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Commande introuvable" });
    }

    order.statut = statut;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Statut mis à jour", order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
