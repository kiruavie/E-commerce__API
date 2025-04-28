const express = require("express");
const {
  registrerController,
  loginController,
} = require("../controllers/auth.controller.js");
const { refreshToken } = require("../controllers/refresh.controller.js");
const { validateRequest } = require("../middlewares/validationRequest.js");
const {
  validationRegister,
  validationLogin,
} = require("../middlewares/validation.middleware.js");

const AuthRouter = express.Router();

AuthRouter.post(
  "/register",
  validationRegister,
  validateRequest,
  registrerController
);

AuthRouter.post("/login", validationLogin, validateRequest, loginController);

AuthRouter.get("/refresh", refreshToken);

module.exports = AuthRouter;
