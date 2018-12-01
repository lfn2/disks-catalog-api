require('../models');
const db = require('../db/db');
const winston = require('winston');

module.exports = async function() {
  try {
    await db.authenticate();
    await db.sync();
  } catch (error) {
    winston.error(error);
    process.exit(1);
  }
}
