module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Products",
    {
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      price: Sequelize.INTEGER,
      product_url: Sequelize.STRING,
      // categori_id: Sequelize.INTEGER,
    },
    { paranoid: true }
  );
  return Product;
};
