module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Books", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : true
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discussion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ratings:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    image_url:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  });
  return Book;
};
