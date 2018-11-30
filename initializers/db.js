require('../models');
const db = require('../db/db');
const debug = require('debug')('disks-catalog-api:server');

module.exports = async function() {
  try {
    await db.authenticate();
    await db.sync();
    debug(123);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
}
