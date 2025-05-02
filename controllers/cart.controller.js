const db = require("../models");
const Cart = db.Cart;

exports.getActiveCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // verifier si un panier actif existe
    let cart = await Cart.findOne({
      where: { user_id: userId, statut: "active" },
      include: ["cart_items"],
    });

    // si aucun panier n'est actif en créé un
    if (!cart) {
      cart = await Cart.create({ user_id: userId, total_price: 0 });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Erreur panier :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

exports.updateCartTotal = async (res, res) => {
  try {
    const userId = req.user.id;
    const { total_price } = req.body;

    const cart = await Cart.findOne({
      where: { user_id: userId, statut: "active" },
    });

    if (!cart) {
      return res.status(404).json("Aucun panier actif");
    }

    cart.total_price = total_price;
    await cart.save();

    res.status(200).json({ success: true, message: "Total mis à jour", cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

exports.completedCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.fondOne({
      where: { user_id: userId, statut: "active" },
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Aucun panier actif trouvé" });
    }

    cart.statut = "completed";
    await cart.save();

    res.status(200).json({ success: true, message: "Panier finalisé", cart });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur serveur",
        error: error.message,
      });
  }
};
