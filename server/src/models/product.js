module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Products",
    {
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      product_url: {
        type: Sequelize.STRING,
      },
      // categori_id: Sequelize.INTEGER,
      status: {
        type: Sequelize.ENUM("AVAILABLE", "UNAVAILABLE"),
      },
      stock: {
        type: Sequelize.STRING,
      },
    },

    { paranoid: true }
  );
  return Product;
};
