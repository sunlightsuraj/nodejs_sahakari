var express = require('express');
var router = express.Router();
var user_typesController = require('../controllers/User_TypesController');

router.get('/', user_typesController.index);

router.get('/:code', user_typesController.show);

router.post('/', user_typesController.save);

router.put('/', user_typesController.updateOrInsert);

router.patch('/:code', user_typesController.update);

router.delete('/:code', user_typesController.delete);

module.exports = router;