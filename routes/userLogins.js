var express = require('express');
var router = express.Router();
var userloginController = require('../controllers/UserLoginController');

router.get('/', userloginController.index);

router.get('/:code', userloginController.show);

router.post('/', userloginController.save);

router.put('/:code', userloginController.updateOrInsert);

router.patch('/:code', userloginController.insert);

router.delete('/:code', userloginController.delete);

module.exports = router;
