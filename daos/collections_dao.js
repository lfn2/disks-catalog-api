const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Collection = require('../models/collection');
const Disk = require('../models/disk');
const CollectionDiskAssociation = require('../models/collection_disk_association');

exports.create = async (attrs) => {
  let collection = await Collection.create({
    name: attrs.name
  });

  return collection;
}

exports.findAll = async () => {
  let collections = await Collection.findAll();

  return collections;
}

exports.find = async (id) => {
  let collection = await Collection.findByPk(id, {
    include: [{
      model: Disk,
      through: {
        //this excludes the association model from being returned
        attributes: []
      }
    }]
  })

  return collection;
}

exports.delete = async (id) => {
  let deletedRows = await Collection.destroy({
    where: {
      id: id
    }
  });

  return deletedRows > 0;
}

exports.addDisksToCollection = async (collection, diskIds) => {
  let disks = await Disk.findAll({
    where: {
      id: {
        [Op.in]: diskIds
      }
    }
  });

  await collection.addDisks(disks);

  let updatedCollection = await this.find(collection.id);
  return updatedCollection;
}

exports.removeDiskFromCollection = async (collectionId, diskId) => {
  let deletedRows = await CollectionDiskAssociation.destroy({
    where: {
      collectionId: collectionId,
      diskId: diskId }
  });

  return deletedRows > 0;
}
