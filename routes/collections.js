const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection_controller');

router.post('/', collectionController.create);
router.get('/', collectionController.getAll);
router.get('/:id', collectionController.get);

module.exports = router;
