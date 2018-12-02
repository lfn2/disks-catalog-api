const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Disk = require('../models/disk');
const Collection = require('../models/collection');
const CollectionDiskAssociation = require('../models/collection_disk_association');

exports.create = async (attrs) => {
  let disk = await Disk.create({
    title: attrs.title,
    artist: attrs.artist
  });

  return disk;
}

exports.search = async (search) => {
  search = `%${search || ''}%`
  let disks = await Disk.findAll({
    where: {
      [Op.or]:[
        {title: {[Op.like]: search}},
        {artist: {[Op.like]: search}}
      ]
    }
  });

  return disks;
}

exports.edit = async (diskId, attrs) => {
  let disk = await Disk.findByPk(diskId)

  if (disk != null) {
    await disk.update({
      title: attrs.title || disk.title,
      artist: attrs.artist || disk.artist
    });
  }

  return disk;
}

exports.delete = async (id) => {
  let destroyedRows = await disk.destroy({
    where: {
      id: id
    }
  });

  return destroyedRows > 0;
}
