const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_URL,
} = process.env;

const sequelize = new Sequelize(
  DB_URL,
  {
    define: {
      timestamps: false
    }
  },
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
  }
);

async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database berhasil.");
  } catch (error) {
    console.error("Gagal terkoneksi ke database:", error);
  }
}

testDBConnection();