const Disk = require('../models/disk');

exports.create = async (request, response) => {
  let disk = await Disk.create({
    title: request.body.title,
    artist: request.body.artist
  });

  response.send(disk);
}
