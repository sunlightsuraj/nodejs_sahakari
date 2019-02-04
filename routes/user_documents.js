var express = require('express');
var router = express.Router();
var userdocumentsController = require('../controllers/UserDocumentsController');

router.get('/', userdocumentsController.index);

router.get('/:code', userdocumentsController.show);

router.post('/', userdocumentsController.save);

router.put('/', userdocumentsController.updateOrInsert);

router.patch('/:code', userdocumentsController.update);

router.delete('/:code', userdocumentsController.delete);

module.exports = router;