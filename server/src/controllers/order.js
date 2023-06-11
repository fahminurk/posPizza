const db = require("../models");
const { nanoid } = require("nanoid");

const orderController = {
  newOrder: async (req, res) => {
    try {
      const { product_id, user_id, qty } = req.body;
      await db.Order.create({
        qty,
        product_id,
        user_id,
        no_order: "trs" + "-" + nanoid(4),
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getAll: async (req, res) => {
    await db.Order.findAll({
      include: [
        {
          model: db.Product,
          attributes: ["price", "name"],
        },
      ],
    }).then((result) => res.send(result));
  },
};

module.exports = orderController;
