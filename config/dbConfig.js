const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = process.env;

const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
  }
);

const databaseValidation = async () => {
  try {
    await sequelize.authenticate();
    console.log('Success connect to database');
  } catch (err) {
    console.error(
      `Unable to connect to the database: ${err}`
    );
  }
};

module.exports = {
  databaseValidation,
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
};