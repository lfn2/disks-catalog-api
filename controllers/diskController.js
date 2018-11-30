const Disk = require('../models/disk');

exports.create = async (request, response) => {
  let disk = await Disk.create({
    title: request.body.title,
    artist: request.body.artist
  });

  response.send(disk);
}

exports.getAll = async (request, response, next) => {
  let disks = await Disk.findAll();
  
  response.send(disks);
}
