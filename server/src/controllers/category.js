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
    try {
      const { page, limit, search } = req.query;
      const currentPage = page || 1;
      const itemsPerPage = limit || 10;
      const offset = (currentPage - 1) * itemsPerPage;

      const { count, rows } = await db.Category.findAndCountAll({
        limit: parseInt(itemsPerPage),
        offset,
        where: {
          name: {
            [db.Sequelize.Op.like]: `%${search ? search : ""}%`,
          },
        },
      });
      const totalPages = Math.ceil(count / itemsPerPage);
      return res.send({ category: rows, totalPages });
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
