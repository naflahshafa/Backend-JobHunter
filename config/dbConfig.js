const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_URL,
} = process.env;

const sequelize = new Sequelize(DB_URL, {
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
  },
};
