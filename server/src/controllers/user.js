const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const avatarUser = process.env.avatarUser;

const userController = {
  getAllUser: async (req, res) => {
    try {
      const { search, sortby, sortdir } = req.query;
      const order = [];

      if (sortby && sortdir) {
        order.push([sortby, sortdir]);
      }

      await db.User.findAll({
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
  register: async (req, res) => {
    try {
      const { name, email, password, phone, role } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const { filename } = req.file;

      let findEmail = await db.User.findOne({
        where: {
          email,
        },
      });

      if (findEmail) {
        res.send({ message: "email alredy exists" });
      }

      await db.User.create({
        name,
        email,
        password: hashPassword,
        phone,
        role,
        avatar_url: avatarUser + filename,
      });

      return res.send({
        message: "register cashier berhasil",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          email,
          role: ["CASHIER", "ADMIN"],
        },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };

          const generateToken = nanoid();
          const token = await db.Token.create({
            expired: moment().add(1, "d").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
            status: "LOGIN",
            role: user.dataValues.role,
          });
          return res.send({
            message: "login berhasil",
            token: token.dataValues.token,
          });
        } else {
          throw new Error("wrong password");
        }
      } else {
        throw new Error("cashier not found");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  editUser: async (req, res) => {
    try {
      const { name, password, email, phone, role } = req.body;
      const { filename } = req.file;

      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.update(
        {
          name,
          password: hashPassword,
          email,
          phone,
          role,
          avatar_url: avatarUser + filename,
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
  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.send({ message: "deleted" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getByToken: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];
      // console.log(token);
      let p = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });
      // console.log(p);
      // console.log(token);

      if (!p) {
        throw new Error("token has expired");
      }

      // console.log("helli");

      let user = await db.User.findOne({
        where: {
          id: JSON.parse(p.dataValues.payload).id,
        },
      });
      // console.log("hello");
      // delete user.dataValues.password;
      req.user = user;
      next();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getUserByToken: async (req, res) => {
    delete req.user.password;
    res.send(req.user);
  },
  token: async (req, res) => {
    await db.Token.findAll().then((result) => res.send(result));
  },
};

module.exports = userController;

//  getAllUser: async (req, res) => {
//     try {
//       const { page, limit, search, role } = req.query;
//       const currentPage = page || 1;
//       const itemsPerPage = limit || 10;
//       const offset = (currentPage - 1) * itemsPerPage;

//       const { count, rows } = role
//         ? await db.User.findAndCountAll({
//             limit: parseInt(itemsPerPage),
//             offset,

//             where: {
//               name: {
//                 [db.Sequelize.Op.like]: `%${search ? search : ""}%`,
//               },
//               role: role ? role : null,
//             },
//           })
//         : await db.User.findAndCountAll({
//             limit: parseInt(itemsPerPage),
//             offset,

//             where: {
//               name: {
//                 [db.Sequelize.Op.like]: `%${search ? search : ""}%`,
//               },
//             },
//           });
//       const totalPages = Math.ceil(count / itemsPerPage);
//       const { count: all } = await db.User.findAndCountAll();
//       const { count: admin } = await db.User.findAndCountAll({
//         where: {
//           role: "ADMIN",
//         },
//       });
//       const { count: cashier } = await db.User.findAndCountAll({
//         where: {
//           role: "CASHIER",
//         },
//       });

//       return res.send({
//         users: rows,
//         totalPages,
//         all,
//         admin,
//         cashier,
//       });
//     } catch (err) {
//       console.log(err.message);
//       return res.status(500).send(err.message);
//     }
//   },
