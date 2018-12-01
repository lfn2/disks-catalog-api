const Sequelize = require('sequelize');
const db = require('../db/db');
const Disk = require('./disk');
const Collection = require('./collection')

const CollectionDiskAssociation = db.define('collection_disk_association');

Disk.belongsToMany(Collection, {through: CollectionDiskAssociation});
Collection.belongsToMany(Disk, {through: CollectionDiskAssociation});

module.exports = CollectionDiskAssociation;
