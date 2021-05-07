

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Books", "title", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Books", "title", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      }),
    ]);
  },
};
