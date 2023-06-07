const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT;
const db = require("./models");
const routes = require("./routes");

// db.sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("test"));

app.use("/users", routes.userRoutes);
app.use("/products", routes.productRoutes);
app.use("/categories", routes.categoryRoutes);
app.use("/imageProduct", express.static(`${__dirname}/public/product`)); // ngeset gambar product ke folder product
app.use("/avatarUser", express.static(`${__dirname}/public/avatar`)); // ngeset gambar user ke folder user

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
