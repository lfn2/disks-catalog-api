const Dao = require('../daos/collections_dao');

exports.create = async (request, response) => {
  if (request.body.name == null) {
    return response.sendStatus(400);
  }

  let collection = await Dao.create(request.body);

  response.send(collection);
}

exports.getAll = async (request, response) => {
  let collections = await Dao.findAll();

  response.send(collections);
}

exports.getOne = async(request, response) => {
  let collection = await Dao.find(request.params.id);

  if (collection === null) {
    return response.sendStatus(404);
  }

  response.send(collection);
}

exports.delete = async(request, response) => {
  let deleted = await Dao.delete(request.params.id);

  if (!deleted) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
}

exports.addDisksToCollection = async (request, response) => {
  if (request.body.disks == null) {
    return response.sendStatus(404);
  }

  let collection = await Dao.find(request.params.collectionId);
  if (collection == null) {
    return response.sendStatus(404);
  }

  let disks =  request.body.disks;
  let updatedCollection = await Dao.addDisksToCollection(collection, disks);

  response.send(updatedCollection);
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
