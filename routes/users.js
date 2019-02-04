var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.get('/', userController.index);

router.get('/:code', userController.show);

router.post('/', userController.save);

router.put('/:code', userController.updateOrInsert);

router.patch('/:code', userController.update);

router.delete('/:code', userController.delete);

module.exports = router;
