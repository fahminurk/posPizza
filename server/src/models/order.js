module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Orders",
    {
      no_order: Sequelize.STRING,
      // price: Sequelize.INTEGER, //PER ITEM EX: PIZZA X 2 = 50RB
      qty: Sequelize.INTEGER,
      //product_id
      //user_id
    },
    {
      paranoid: true,
    }
  );
  return Order;
};
