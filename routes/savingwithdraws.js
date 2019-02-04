var express = require('express');
var router = express.Router();
var savingwithdrawController = require('../controllers/SavingwithdrawsController');

router.get('/', savingwithdrawController.index);

router.get('/:code', savingwithdrawController.show);

router.post('/', savingwithdrawController.save);

router.put('/', savingwithdrawController.updateOrInsert);

router.patch('/:code', savingwithdrawController.update);

router.delete('/:code',savingwithdrawController.delete);

module.exports = router;