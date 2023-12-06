const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
  DATABASE_URL,
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  define: {
    timestamps: false,
  },
});

const testDBConnection = async() => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil.");
  } catch (error) {
    console.error("Gagal terkoneksi ke database:", error);
  }
};

module.exports = {
  testDBConnection,
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "DB_DIALECT",
  },
};
