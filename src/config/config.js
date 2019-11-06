const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "store_manager",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_TEST,
    "host": process.env.HOST,
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "postgres",
    "url": process.env.DATABASE_URL,
    "operatorsAliases": false
  }
}
