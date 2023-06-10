module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define(
    "OrderDetails",
    {
      //order_id

      total_price: {
        // keseluruhan

        type: Sequelize.INTEGER,
      },
    },
    {
      parnaoid: true,
    }
  );
  return OrderDetails;
};
