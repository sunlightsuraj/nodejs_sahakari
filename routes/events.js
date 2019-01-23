var express = require('express');
var router = express.Router();
var eventController = require('../controllers/EventController');

router.get('/', eventContrller.index);

router.get('/:code', eventContrller.show);

router.post('/', eventContrller.save);

router.put('/', eventContrller.updateOrInsert);

router.patch('/:code', eventContrller.update);

router.delete('/:code', eventContrller.delete);

module.exports = router;