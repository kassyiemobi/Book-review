module.exports = (sequelize, DataTypes) => {
  const discuss = sequelize.define("discuss", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });   
  return discuss;
};
