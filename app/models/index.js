const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: '0',

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.aquarium = require("../models/aquarium.model.js")(sequelize, Sequelize);
db.sensor = require("../models/sensor.model.js")(sequelize, Sequelize);

db.aquarium.belongsTo(db.sensor);

db.aquarium.belongsToMany(db.user, {
    through: "user_aquariums",
    foreignKey: "aquarium_id",
    otherKey: "user_id"
});
db.user.belongsToMany(db.aquarium, {
    through: "user_aquariums",
    foreignKey: "user_id",
    otherKey: "aquarium_id"
});

module.exports = db;