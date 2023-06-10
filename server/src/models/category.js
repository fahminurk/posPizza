module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Categories",
    {
      name: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.ENUM("AVAILABLE", "UNAVAILABLE"),
      },
    },
    {
      paranoid: true,
    }
  );
  return Category;
};
