const Dao = require('../daos/disks_dao');

exports.create = async (request, response) => {
  let disk = await Dao.create(request.body);

  response.send(disk);
}

exports.getAll = async (request, response) => {
  let disks = await Dao.search(request.query.search);

  response.send(disks);
}

exports.edit = async (request, response) => {
  let disk = await Dao.edit(request.params.id, request.body);
  if (disk == null) {
    return response.sendStatus(404);
  }

  response.send(disk);
}

exports.delete = async (request, response) => {
  let deleted = await Dao.delete(request.params.id);
  if (!deleted) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
}
