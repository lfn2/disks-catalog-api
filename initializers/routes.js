const express = require('express');
const logger = require('morgan');
const disks = require('../routes/disks');

module.exports = function(app) {
  app.use(logger('dev'));
  app.use(bodyParser());
  app.use('/api/disks', disks);
}
