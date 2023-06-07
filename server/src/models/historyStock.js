module.exports = (sequelize, Sequelize) => {
  const HistoryStock = sequelize.define(
    "HistoryStocks",
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
  return HistoryStock;
};
