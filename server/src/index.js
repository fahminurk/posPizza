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
app.use("/imageProduct", express.static(`${__dirname}/public/product`));
app.use("/avatarUser", express.static(`${__dirname}/public/avatar`));

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
