const express = require('express');
const logger = require('morgan');
const error = require('../middlewares/error');
const disks = require('../routes/disks');
const collections = require('../routes/collections');
const cors = require('cors');

module.exports = function(app) {
  app.use(logger('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/disks', disks);
  app.use('/api/collections', collections);
  app.use(error);
}
