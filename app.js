const express = require('express');
const app = express();

require('./initializers/db')();
require('./initializers/routes')(app);

module.exports = app;
