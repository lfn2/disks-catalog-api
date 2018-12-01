const Collection = require('../models/collection');
const Disk = require('../models/disk');

exports.create = async (request, response) => {
  let disks = await Disk.findAll({
    where: { id: request.body.disks }
  });

  let collection = await Collection.create({
    name: request.body.name
  });
  await collection.addDisks(disks);

  response.send(collection);
}

exports.getAll = async (request, response) => {
  let collections = await Collection.findAll();

  response.send(collections);
}

exports.get = async(request, response) => {
  let collection = await Collection.findByPk(request.params.id, {
    include: [{
      model: Disk,
      through: {
        attributes: ['title', 'artist']
      }
    }]
  })

  response.send(collection);
}
