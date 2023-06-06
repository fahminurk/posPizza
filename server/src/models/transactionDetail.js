module.exports = (sequelize, Sequelize) => {
  const TransactionDetail = sequelize.define("TransactionDetails", {
    // transaksi_id: Sequelize.INTEGER,
    // product_id: Sequelize.INTEGER,
  });
  return TransactionDetail;
};
