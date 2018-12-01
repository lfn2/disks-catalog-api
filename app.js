const express = require('express');
const app = express();

module.exports = async function(callback) {
  await require('express-async-errors');
  await require('./initializers/logger')();
  await require('./initializers/port')(app);
  await require('./initializers/routes')(app);
  await require('./initializers/db')();

  callback(app);
};
