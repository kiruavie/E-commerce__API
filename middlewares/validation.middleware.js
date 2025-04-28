const { body } = require("express-validator");

exports.createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Le nom du produit est requis")
    .isLength({ min: 3 })
    .withMessage("Le nom doit contenir au moins 3 caractères"),

  body("description")
    .notEmpty()
    .withMessage("La description est requise")
    .isLength({ min: 10 })
    .withMessage("La description doit contenir au moins 10 caractères"),

  body("price")
    .notEmpty()
    .withMessage("Le prix est requis")
    .isFloat({ min: 0 })
    .withMessage("Le prix doit être un nombre positif"),

  body("image")
    .optional()
    .isURL()
    .withMessage("L'image doit être une URL valide"),
];

exports.validationRegister = [
  body("name")
    .notEmpty()
    .withMessage("Le nom est requis")
    .isLength({ min: 3 })
    .withMessage("Le nom doit contenir au moins 3 caractères"),

  body("email")
    .notEmpty()
    .withMessage("Adresse email requise")
    .trim()
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("role")
    .notEmpty()
    .withMessage("Le rôle est requis")
    .isIn(["client", "admin"])
    .withMessage("Rôle invalide"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 5 })
    .withMessage("Le mot de passe doit contenir au moins 5 caractères"),
];

exports.validationLogin = [
  body("email")
    .notEmpty()
    .withMessage("Adresse email requise")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .isLength({ min: 5 })
    .withMessage("Le mot de passe doit contenir au moins 5 caractères"),
];
