module.exports = (sequelize, Sequelize) => {
  const HistoryStock = sequelize.define("HistoryStocks", {
    // product_id: Sequelize.INTEGER,
    status: {
      type: Sequelize.ENUM("IN", "OUT"),
    },
    quantity: Sequelize.INTEGER,
    reference: Sequelize.STRING,
  });
  return HistoryStock;
};
