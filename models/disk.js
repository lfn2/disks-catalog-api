const Sequelize = require('sequelize');
const db = require('../db/db');

const Disk = db.define('disk', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Disk;
