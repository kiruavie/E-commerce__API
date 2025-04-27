const db = require("../models");
const Product = db.Product;

// créer un product (uniquement pour les admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, available, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json("Tous les champs sont réquis");
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      available: true,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Produit créé avec succès",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      succes: false,
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// Récupérer tous les produits

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Récupérer un seul product
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json("produit introuvable");
    }

    res.status(200).json({
      success: true,
      message: "produit trouvé",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, available, image } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json("Produit introuvable");
    }

    const updatedProduct = await product.update({
      name,
      description,
      price,
      available,
      image,
    });

    res.status(200).json({
      success: true,
      message: "Mise à jour terminé.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json("Produit introuvable");
    }

    await product.destroy();
    res.status(200).json({
      success: true,
      message: "Produit supprimé",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
