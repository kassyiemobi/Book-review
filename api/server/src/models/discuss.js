module.exports = (sequelize, DataTypes) => {
  const Discuss = sequelize.define("discuss", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });   
  return Discuss;
};
