const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/User.js')(sequelize, Sequelize);
db.categories = require('../models/Category.js')(sequelize, Sequelize);
db.formations = require('../models/Formation.js')(sequelize, Sequelize);
db.sections = require('../models/Section.js')(sequelize, Sequelize);
db.components = require('../models/Component.js')(sequelize, Sequelize);


//Associations
db.categories.hasMany(db.formations, { as: "formations" });
db.formations.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});
db.formations.hasMany(db.sections, {as: "sections"});
db.sections.belongsTo(db.formations, {
  foreignKey: "formationId",
  as: "formation",
});

db.sections.hasMany(db.components, {as: "components"});
db.components.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

module.exports = db;

