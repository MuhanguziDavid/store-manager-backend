const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "postgres",
    "operatorsAliases": '0'
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_TEST,
    "host": process.env.HOST,
    "dialect": "postgres",
    "operatorsAliases": '0'
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "postgres",
    "url": process.env.DATABASE_URL,
    "operatorsAliases": '0'
  }
}
