'use strict';

import fs from 'fs';
import path from 'path';
import * as Sequelize from 'sequelize';
const basename = 'index.js';
const dirname = path.resolve(path.resolve(), 'src/models');
import { config } from '../config/config.js'
const db = {};
const env = 'development'

export const sequelize = new Sequelize.Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    port: Number(config[env].port),
    dialect: 'mysql',
    logging: config[env].logging
  }
);

// fs
//   .readdirSync(dirname)
//   .filter(file => {
//     console.log(file);
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     console.log(file);
//     const model = require(path.join(dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
