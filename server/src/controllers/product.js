const db = require("../models");
const productImage = process.env.productImage;
const productController = {
  getAllProduct: async (req, res) => {
    try {
      const { search, sortby, sortdir } = req.query;
      const order = [];
      if (sortby && sortdir) {
        order.push([sortby, sortdir]);
      }

      await db.Product.findAll({
        include: [
          {
            model: db.Category,
            attributes: ["name"],
          },
        ],
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
  createNewProduct: async (req, res) => {
    try {
      const { name, price, description, category_id } = req.body;
      const { filename } = req.file;
      const pr = await db.Product.create({
        name,
        price,
        description,
        category_id,
        product_url: productImage + filename,
        status: "AVAILABLE",
      });

      return res.send({ message: "success added new product" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  editProduct: async (req, res) => {
    try {
      const { name, price, description, category_id } = req.body;
      const { filename } = req.file;
      await db.Product.update(
        {
          name,
          price,
          description,
          category_id,
          product_url: productImage + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) => res.send(result));
      // return res.send({ message: "edit berhasil" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    await db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ message: "success deleted" });
  },
};

module.exports = productController;

//  getAllProduct: async (req, res) => {
//     try {
//       const { page, limit, search, category_id, sortby, sortdir } = req.query;
//       const currentPage = page || 1;
//       const itemsPerPage = limit || 10;
//       const offset = (currentPage - 1) * itemsPerPage;
//       // console.log(sortby, sortdir);
//       const order = [];
//       if (sortby && sortdir) {
//         order.push([sortby, sortdir]);
//       }

//       const whereClause = {
//         name: {
//           [db.Sequelize.Op.like]: `%${search ? search : ""}%`,
//         },
//       };

//       if (category_id) {
//         whereClause.category_id = category_id;
//       }

//       const { count, rows } = await db.Product.findAndCountAll({
//         include: db.Category,
//         limit: parseInt(itemsPerPage),
//         offset,
//         where: whereClause,
//         order,
//       });

//       const totalPages = Math.ceil(count / itemsPerPage);
//       const { count: all } = await db.Product.findAndCountAll();
//       const { count: pizza } = await db.Product.findAndCountAll({
//         where: {
//           category_id: 1,
//         },
//       });
//       const { count: pasta } = await db.Product.findAndCountAll({
//         where: {
//           category_id: 2,
//         },
//       });

//       return res.send({
//         products: rows,
//         totalPages,
//         all,
//         pizza,
//         pasta,
//       });
//     } catch (err) {
//       console.log(err.message);
//       return res.status(500).send(err.message);
//     }
//   },
