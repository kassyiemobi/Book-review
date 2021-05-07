module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Books', 'discussion', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Books', 'ratings', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Books', 'discussion', { transaction: t }),
        queryInterface.removeColumn('Books', 'ratings', { transaction: t })
      ]);
    });
  }
};
