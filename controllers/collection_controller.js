const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Collection = require('../models/collection');
const Disk = require('../models/disk');
const CollectionDiskAssociation = require('../models/collection_disk_association');

exports.create = async (request, response) => {
  if (request.body.name == null) {
    return response.sendStatus(400);
  }

  let collection = await Collection.create({
    name: request.body.name
  });

  response.send(collection);
}

exports.getAll = async (request, response) => {
  let collections = await Collection.findAll();

  response.send(collections);
}

exports.getOne = async(request, response) => {
  let collection = await Collection.findByPk(request.params.id, {
    include: [{
      model: Disk,
      through: {
        //this excludes the association model from being returned
        attributes: []
      }
    }]
  })

  if (collection === null) {
    return response.sendStatus(404);
  }

  response.send(collection);
}

exports.delete = async(request, response) => {
  let collection = await Collection.findByPk(request.params.id);

  if (collection === null) {
    return response.sendStatus(404);
  }

  collection.destroy();

  response.sendStatus(204);
}

exports.addDisksToCollection = async (request, response) => {
  if (request.body.disks == null) {
    return response.sendStatus(404);
  }

  let collection = await Collection.findByPk(request.params.collectionId);
  if (collection == null) {
    return response.sendStatus(404);
  }

  let disks = await Disk.findAll({
    where: {
      id: {
        [Op.in]: request.body.disks
      }
    }
  });

  await collection.addDisks(disks);

  response.send(edited);
}

exports.deleteDisk = async (request, response) => {
  let collection = await Collection.findByPk(request.params.collectionId);
  if (collection == null) {
    return response.sendStatus(404);
  }

  let disk = await Disk.findByPk(request.params.diskId);
  if (disk === null) {
    return response.sendStatus(404);
  }

  CollectionDiskAssociation.destroy({
    where: {
      collectionId: collection.id,
      diskId: disk.id }
  });

  response.sendStatus(204);
}
