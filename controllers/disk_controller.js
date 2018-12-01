const Disk = require('../models/disk');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (request, response) => {
  let disk = await Disk.create({
    title: request.body.title,
    artist: request.body.artist
  });

  response.send(disk);
}

exports.getAll = async (request, response) => {
  let search = `%${request.query.search || ''}%`
  let disks = await Disk.findAll({
    where: {
      [Op.or]:[
        {title: {[Op.like]: search}},
        {artist: {[Op.like]: search}}
      ]
    }
  });

  response.send(disks);
}

exports.edit = async (request, response) => {
  let disk = await Disk.findByPk(request.params.id)
  if (disk === null) {
    return response.sendStatus(404);
  }

  await disk.update({
    title: request.body.title || disk.title,
    artist: request.body.artist || disk.artist
  });

  response.send(disk);
}

exports.delete = async (request, response) => {
  let disk = await Disk.findByPk(request.params.id);
  if (disk === null) {
    return response.sendStatus(404);
  }

  disk.destroy();

  response.sendStatus(204);
}
