module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define(
    "Stocks",
    {
      // product_id: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return Stock;
};
