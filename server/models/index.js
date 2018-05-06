import winston from 'winston';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
// check the environment
const env = process.env.NODE_ENV || 'development';
winston.info(`The current enviornment is ${env}`);
// The current environment is loaded into the config
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// filters the files in the current folder and add all files to
// db, excluding the current index.js file
fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
