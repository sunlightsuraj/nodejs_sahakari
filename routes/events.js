var express = require('express');
var router = express.Router();
var eventController = require('../controllers/EventController');

router.get('/', eventController.index);

router.get('/:code', eventController.show);

router.post('/', eventController.save);

router.put('/', eventController.updateOrInsert);

router.patch('/:code', eventController.update);

router.delete('/:code', eventController.delete);

module.exports = router;