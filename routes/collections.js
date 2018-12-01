const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection_controller');

router.post('/', collectionController.create);

module.exports = router;
