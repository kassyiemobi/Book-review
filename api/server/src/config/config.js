require("dotenv").config();
const { required } = require("joi");

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },

  test: {
    database: "bookclub_test",
    username: "postgres",
    password: "Lookup0806Kelvin",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  //postgres://rhpdmrhrbptsmg:20a08034021650b7347678cd2cf5910c517b36ffebd10d26116c6bb36eee9eb9@ec2-3-211-37-117.compute-1.amazonaws.com:5432/dc33n2epfolsf7
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS TO FIX UNHANDLED REJECTION
      },
    },
  },
};
