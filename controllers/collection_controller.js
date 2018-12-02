const CollectionsDao = require('../daos/collections_dao');
const DisksDao = require('../daos/disks_dao');

exports.create = async (request, response) => {
  if (request.body.name == null) {
    return response.sendStatus(400);
  }

  let collection = await CollectionsDao.create(request.body);

  response.send(collection);
}

exports.getAll = async (request, response) => {
  let collections = await CollectionsDao.findAll();

  response.send(collections);
}

exports.getOne = async(request, response) => {
  let collection = await CollectionsDao.find(request.params.id);

  if (collection === null) {
    return response.sendStatus(404);
  }

  response.send(collection);
}

exports.delete = async(request, response) => {
  let deleted = await CollectionsDao.delete(request.params.id);

  if (!deleted) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
}

exports.addDisksToCollection = async (request, response) => {
  if (request.body.disks == null) {
    return response.sendStatus(404);
  }

  let collection = await CollectionsDao.find(request.params.collectionId);
  if (collection == null) {
    console.log('not found');
    return response.sendStatus(404);
  }

  let disks =  request.body.disks;
  let updatedCollection = await CollectionsDao.addDisksToCollection(collection, disks);

  response.send(updatedCollection);
}

exports.deleteDisk = async (request, response) => {
  let collection = await CollectionsDao.find(request.params.collectionId);
  if (collection == null) {
    return response.sendStatus(404);
  }

  let disk = await DisksDao.find(request.params.diskId);
  if (disk === null) {
    return response.sendStatus(404);
  }

  let deleted = CollectionsDao.removeDiskFromCollection(collection.id, disk.id);
  if (!deleted) {
    response.sendStatus(500);
  }

  response.sendStatus(204);
}
