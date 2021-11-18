const Sequelize = require('sequelize');
const winston = require('./winston');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    winston.log('info', 'Connection has been established successfully.');
  } catch (err) {
    winston.log('error', 'Unable to connect to the database:', err);
  }
};

dbConnect();

module.exports = sequelize;
