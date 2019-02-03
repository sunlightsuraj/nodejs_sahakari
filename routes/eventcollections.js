var express = require('express');
var router = express.Router();
var eventcollectionController = require('../controllers/EventcollectionController');

router.get('/', eventcollectionController.index);

router.get('/:code', eventcollectionController.show);

router.post('/', eventcollectionController.save);

router.put('/', eventcollectionController.updateOrInsert);

router.patch('/:code', eventcollectionController.update);

router.delete('/:code', eventcollectionController.delete);

module.exports = router;