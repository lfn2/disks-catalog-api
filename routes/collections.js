const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection_controller');

router.post('/', collectionController.create);
router.get('/', collectionController.getAll);
router.get('/:id', collectionController.getOne);
router.delete('/:id', collectionController.delete);
router.post('/:collectionId/addDisks', collectionController.addDisksToCollection);
router.delete('/:collectionId/disks/:diskId', collectionController.deleteDisk);

module.exports = router;
