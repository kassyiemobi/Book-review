module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "email", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn("Users", "email")]);
  },
};
