const dbConfig = require('../Config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('....connected')
  })
  .catch((err) => {
    console.log('Error not connected ' + err)
  })

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.employee = require('./Emp.models.js')(sequelize, DataTypes)
db.sequelize
  .sync()
  .then(() => {
    console.log('yes its sync')
  })
  .catch(
    error => {
      if (error) {
        console.log('Inside error, fetching product line items failed')
      }
    })
module.exports = db
