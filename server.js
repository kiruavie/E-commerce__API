require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("E-commerce API");
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en marche sur http://localhost:${PORT}`);
});
