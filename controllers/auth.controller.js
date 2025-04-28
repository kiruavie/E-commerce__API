const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register controller
exports.registrerController = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json("Tous les champs sont réquis");
    }

    // verifier si l'utilisateur existe

    const exist_user = await User.findOne({ where: { email } });

    if (exist_user) {
      return res.status(400).json("L'addresse email existe déja");
    }

    // créer un utilisateur
    const create_user = await User.create({
      name,
      email,
      role: req.body.role || "client",
      password,
    });

    // supprimer le mot de passe avant de renvoyer la réponse json
    const sanitzed_user = { ...create_user.toJSON() };
    delete sanitzed_user.password;

    res.status(201).json({
      status: true,
      message: "Inscription réussi.",
      user: sanitzed_user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur du serveur",
      error: error.message,
    });
  }
};

// login controller
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verifier les champs
    if (!email || !password) {
      return res.status(400).json("Tous les champs sont requis");
    }

    // Verifier si l'utilisateur existe
    const exist_user = await User.findOne({
      where: { email },
      attributes: ["id", "name", "email", "role", "password"],
    });
    if (!exist_user) {
      return res.status(400).json("Email ou mot de passe incorrecte");
    }

    // verifier le mot de passe
    const isMatch = await bcrypt.compare(password, exist_user.password);
    if (!isMatch) {
      return res.status(400).json("Adresse email ou mot de passe incorrect");
    }

    // Access token (15min) & Refresh token (7j)

    // Génerer un token JWT
    const accessToken = jwt.sign(
      { id: exist_user.id, email: exist_user.email, role: exist_user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: exist_user.id, role: exist_user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Supprime le mot de passe de la réponse
    const sanitized_user = { ...exist_user.toJSON() };
    delete sanitized_user.password;

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      accessToken,
      refreshToken,
      user: sanitized_user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur du serveur", error: error.message });
  }
};
