"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Token = require("./token")(sequelize, Sequelize);
db.Category = require("./category")(sequelize, Sequelize);
db.HistoryStock = require("./historyStock")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.Stock = require("./stock")(sequelize, Sequelize);
db.Transaction = require("./transaction")(sequelize, Sequelize);
db.TransactionDetail = require("./transactionDetail")(sequelize, Sequelize);

db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
});
db.Stock.belongsTo(db.Product, {
  foreignKey: "product_id",
});

module.exports = db;
