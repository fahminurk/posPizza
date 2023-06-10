module.exports = (sequelize, Sequelize) => {
  const StockHistory = sequelize.define(
    "StockHistories",
    {
      // product_id: Sequelize.INTEGER,
      status: {
        type: Sequelize.ENUM("IN", "OUT"),
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      reference: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return StockHistory;
};
