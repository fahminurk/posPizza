module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    "Transactions",
    {
      no_transaction: Sequelize.STRING,
      total_price: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return Transaction;
};
