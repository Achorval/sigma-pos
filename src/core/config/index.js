require("dotenv").config({path:__dirname+'/./../../.env'});

module.exports = {
  db: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      storage: `./${process.env.DB_DATABASE}.mysql2`
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  SECRET_KEY: 'q6wNjDCNkWBxNdMYKJ4vQ9Hz3WKBCVrR',
  DOMAIN: 'https://pos.com',
}

