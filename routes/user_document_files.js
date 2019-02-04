var express = require('express');
var router = express.Router();
var userdocumentfilesController = require('../controllers/UserDocumentFilesController');

router.get('/', userdocumentfilesController.index);

router.get('/:code', userdocumentfilesController.show);

router.post('/', userdocumentfilesController.save);

router.put('/', userdocumentfilesController.updateOrInsert);

router.patch('/:code', userdocumentfilesController.update);

router.delete('/:code', userdocumentfilesController.delete);

module.exports = router;