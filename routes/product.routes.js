const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {
  createProductValidator,
} = require("../middlewares/validation.middleware");
const { validateRequest } = require("../middlewares/validationRequest");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getProductById);

ProductRouter.post(
  "/",
  authMiddleware,
  isAdmin,
  createProductValidator,
  validateRequest,
  createProduct
);

ProductRouter.put(
  "/:id",
  authMiddleware,
  isAdmin,
  createProductValidator,
  validateRequest,
  updateProduct
);

ProductRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = ProductRouter;
