var express = require('express');
var router = express.Router();
var savingController = require('../controllers/SavingController');

router.get('/', savingController.index);

router.get('/:code', savingController.show);

router.post('/', savingController.save);

router.put('/', savingController.updateOrInsert);

router.patch('/:code', savingController.update);

router.delete('/:code',savingController.delete);

module.exports = router;