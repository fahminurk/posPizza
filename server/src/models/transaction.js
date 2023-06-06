module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("Transactions", {
    no_transaksi: Sequelize.STRING,
    total_price: Sequelize.INTEGER,
  });
  return Transaction;
};
