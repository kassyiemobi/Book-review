module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define("comment", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return comment;
};
