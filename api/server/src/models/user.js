const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
    // {
    //   hooks: {
    //     beforeCreate: (user, options) => {
    //       {
    //         user.password =
    //           user.password && user.password != ""
    //             ? bcrypt.hashSync(user.password, 10)
    //             : "";
    //       }
    //     },
    //   },
    // }
  );
  return User;
};
