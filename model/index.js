const { FORCE } = require("sequelize/lib/index-hints");
const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("....connected");
  })
  .catch((err) => {
    console.log("Error not connected " + err);
  });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Emp = require("./EmpModels.js")(sequelize, DataTypes);
db.sequelize
  .sync()
  .then(() => {
    console.log(`yes its sync`);
  })
  .catch((err) => {
    console.log("its not sync");
  });

module.exports = db;
