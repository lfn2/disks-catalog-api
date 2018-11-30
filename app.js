var express = require('express');
var logger = require('morgan');
var debug = require('debug')('disks-catalog-api:server');
var db = require('./db/db');
var models = require('./models');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);

var connectToDb = async function() {
  try {
    await db.authenticate();
    await db.sync();
    debug('Connected to database')
  } catch (error) {
    debug(error);
    process.exit(1);
  }
}
connectToDb();

module.exports = app;
