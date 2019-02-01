var express = require('express');
var router = express.Router();
var membermoneylogController = require('../controllers/MembermoneylogController');

router.get('/', membermoneylogController.index);

router.get('/:code', membermoneylogController.show);

router.post('/', membermoneylogController.save);

router.put('/', membermoneylogController.updateOrInsert);

router.patch('/:code', membermoneylogController.update);

router.delete('/:code',membermoneylogController.delete);

module.exports = router;