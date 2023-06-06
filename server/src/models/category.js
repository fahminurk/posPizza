module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Categories", {
    name: Sequelize.STRING,
  });
  return Category;
};
