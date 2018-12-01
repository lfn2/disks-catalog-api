const Sequelize = require('sequelize');
const db = require('../db/db');

const Disk = db.define('collection', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Disk;
