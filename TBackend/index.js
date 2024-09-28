// app.js
const express = require("express");
const bodyParser = require("body-parser");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const favRoutes = require("./routes/favRoutes");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use the modular routes
app.use("/address", addressRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/favourite", favRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
