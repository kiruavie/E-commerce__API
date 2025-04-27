const express = require("express");
const {
  registrerController,
  loginController,
} = require("../controllers/auth.controller.js");
const { refreshToken } = require("../controllers/refresh.controller.js");

const router = express.Router();

// inscription
router.post("/register", registrerController);

// connexion
router.post("/login", loginController);

router.get("/refresh", refreshToken);

module.exports = router;
