const express = require('express');
const router = express.Router();
const diskController = require('../controllers/diskController');

router.post('/', diskController.create);
router.get('/', diskController.getAll);
router.patch('/:id', diskController.edit);
router.delete('/:id', diskController.delete);

module.exports = router;
