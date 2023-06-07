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
        type: Sequelize.STRING,
      },
      product_url: {
        type: Sequelize.STRING,
      },
      // categori_id: Sequelize.INTEGER,
      status: {
        type: Sequelize.ENUM("AVAILABLE", "UNAVAILABLE"),
      },
    },

    { paranoid: true }
  );
  return Product;
};
