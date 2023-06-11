const db = require("../models");

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await db.Category.create({
        name,
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getAllCategory: async (req, res) => {
    const { search, sortby, sortdir } = req.query;
    const order = [];
    if (sortby && sortdir) {
      order.push([sortby, sortdir]);
    }
    try {
      await db.Category.findAll({
        order,
        where: {
          name: {
            [db.Sequelize.Op.like]: `%${search ? search : ""}%`,
          },
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await db.Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.send({ message: "success deleted" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  editProduct: async (req, res) => {
    try {
      const { name } = req.body;
      await db.Category.update(
        {
          name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
};

module.exports = categoryController;
