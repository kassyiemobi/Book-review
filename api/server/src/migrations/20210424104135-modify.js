const { DataTypes } = require("sequelize/types");

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Books", // table name
        "image_url", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn("Books", "image_url"),
    ]);
  },
};
