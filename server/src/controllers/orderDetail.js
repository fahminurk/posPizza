const db = require("../models");

const orderDetailController = {
  getAll: async (req, res) => {
    await db.OrderDetails.findAll({
      include: db.Order,
    }).then((result) => res.send(result));
  },
};

module.exports = orderDetailController;
