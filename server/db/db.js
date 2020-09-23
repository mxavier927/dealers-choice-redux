const Sequelize = require("sequelize")
//initialize your db, don't forget to include the possible heroku database URL
const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/acme_db'
const db = new Sequelize(databaseUrl, {
    logging: false,
    operatorsAliases: false
  })
//export your db
module.exports = db