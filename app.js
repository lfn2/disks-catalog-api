const express = require('express');
const app = express();

require('express-async-errors');
require('./initializers/logger')();
require('./initializers/db')();
require('./initializers/routes')(app);

module.exports = app;
