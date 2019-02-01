var express = require('express');
var router = express.Router();
var document_typesController = require('../controllers/Document_TypesController');

router.get('/', document_typesController.index);

router.get('/:code', document_typesController.show);

router.post('/', document_typesController.save);

router.put('/', document_typesController.updateOrInsert);

router.patch('/:code', document_typesController.update);

router.delete('/:code', document_typesController.delete);

module.exports = router;