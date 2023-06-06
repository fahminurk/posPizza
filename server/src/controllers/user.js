const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const avatarUser = process.env.avatarUser;

const userController = {
  getAllUser: async (req, res) => {
    await db.User.findAll().then((result) => res.send(result));
  },
  registerCashier: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.create({
        name,
        email,
        password: hashPassword,
        phone,
        role: "CASHIER",
      });

      return res.send({
        message: "register cashier berhasil",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const { filename } = req.file;
      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.create({
        name,
        email,
        password: hashPassword,
        phone,
        role: "ADMIN",
        avatar_url: avatarUser + filename,
      });
      return res.send({
        message: "register admin berhasil",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await db.User.findOne({
        where: {
          email,
          role: "ADMIN",
        },
      });

      if (admin) {
        const match = await bcrypt.compare(password, admin.dataValues.password);
        if (match) {
          const payload = {
            id: admin.dataValues.id,
          };

          const generateToken = nanoid();
          const token = await db.Token.create({
            expired: moment().add(1, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
            status: "LOGIN",
            role: "ADMIN",
          });
          return res.send({
            message: "login berhasil",
            value: admin,
            token: token.dataValues.token,
          });
        } else {
          throw new Error("wrong password");
        }
      } else {
        throw new Error("admin not found");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  loginCashier: async (req, res) => {
    try {
      const { email, password } = req.body;
      const cashier = await db.User.findOne({
        where: {
          email,
          role: "CASHIER",
        },
      });

      if (cashier) {
        const match = await bcrypt.compare(
          password,
          cashier.dataValues.password
        );
        if (match) {
          const payload = {
            id: cashier.dataValues.id,
          };

          const generateToken = nanoid();
          const token = await db.Token.create({
            expired: moment().add(1, "d").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
            status: "LOGIN",
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
};

module.exports = userController;
