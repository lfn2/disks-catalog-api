const Disk = require('../models/disk');

exports.create = async (request, response) => {
  let disk = await Disk.create({
    title: request.body.title,
    artist: request.body.artist
  });

  response.send(disk);
}

exports.getAll = async (request, response) => {
  let disks = await Disk.findAll();

  response.send(disks);
}

exports.edit = async (request, response) => {
    let disk = await Disk.findByPk(request.params.id)

    if (disk === null) {
      response.sendStatus(404);
    }

    await disk.update({
      title: request.body.title,
      artist: request.body.artist
    });

    response.send(disk);
}

exports.delete = async (request, response) => {
  let disk = await Collection.findByPk(request.params.id);
  if (disk === null) {
    return response.sendStatus(404);
  }

  destroyed.destroy();

  response.sendStatus(204);
}
