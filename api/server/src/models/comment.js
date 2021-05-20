module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comments", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Comment;
};
