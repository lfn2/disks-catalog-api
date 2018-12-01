const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection_controller');

router.post('/', collectionController.create);
router.get('/', collectionController.getAll);
router.get('/:id', collectionController.getOne);
router.delete('/:id', collectionController.delete);
router.delete('/:collectionId/disk/:diskId', collectionController.deleteDisk);

module.exports = router;
