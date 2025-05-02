const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const AuthRouter = require("./routes/auth.routes");
const ProductRouter = require("./routes/product.routes");
const CartRoutes = require("./routes/cart.route");
const app = express();

// middlewares pour analyser les requêtes HTTP
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// middlewares pour les routes
// auth routes
app.use("/api/v1/auth", AuthRouter);

// product routes
app.use("/api/v1/products", ProductRouter);

// cart routes
app.use("/api/v1/cart", CartRoutes);

// connexion à la base de donnée
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès !");
  } catch (error) {
    console.error(
      "❌ Impossible d'accéder à la base de données :",
      error.message
    );
    process.exit(1);
  }
})();

module.exports = app;
