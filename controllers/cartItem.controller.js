const db = require("../models");
const Cart = db.Cart;
const Product = db.Product;
const CartItem = db.CartItem;

// Fonction pour recalculer le total du panier
const updateCartTotal = async (cartId) => {
  const items = await CartItem.findAll({ where: { cart_id: cartId } });
  const total = items.reduce((sum, item) => sum + item.sub_total, 0);
  await Cart.update({ total_price: total }, { where: { id: cartId } });
};

// Ajouter un produit au panier
exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const cart = await Cart.findOne({
      where: { user_id: userId, statut: "active" },
    });
    if (!cart) return res.status(404).json("Panier actif non trouvé");

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json("Produit introuvable");

    const existingItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity,
      });
    }

    await updateCartTotal(cart.id);

    res
      .status(200)
      .json({ success: true, message: "Article ajouté avec succès" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mettre à jour la quantité d’un produit
exports.updateItemQuantity = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;

    const item = await CartItem.findByPk(itemId);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Article introuvable" });
    if (!quantity || quantity < 1)
      return res
        .status(400)
        .json({ success: false, message: "Quantité invalide" });

    item.quantity = quantity;
    await item.save();

    await updateCartTotal(item.cart_id);

    res
      .status(200)
      .json({ success: true, message: "Quantité mise à jour", item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Supprimer un produit du panier
exports.deleteItemFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await CartItem.findByPk(itemId);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Article introuvable" });
    }

    const cartId = item.cart_id;
    await item.destroy();

    await updateCartTotal(cartId);

    res
      .status(200)
      .json({ success: true, message: "Article supprimé du panier" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
