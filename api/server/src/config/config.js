const { required } = require("joi");

require("dotenv").config();

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

  production: {
    // database: "bookclub",
    // username: "postgres",
    // password: "Lookup0806Kelvin",
    // host: "127.0.0.1",
    // port: 5432,
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
    
    ssl: { rejectUnauthorized: false },
  },
};
