module.exports = {
  db: {
    database: process.env.DB_DATABASE || 'pos',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    options: {
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      storage: `./${process.env.DB_DATABASE || 'pos'}.mysql2`
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

