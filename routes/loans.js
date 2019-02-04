var express = require('express');
var router  = express.Router();
var loanController = require('../controllers/LoanController');

router.get('/', loanController.index);

router.get('/:code', loanController.show);

router.post('/', loanController.save);

router.put('/', loanController.updateOrInsert);

router.patch('/:code', loanController.update);

router.delete('/:code', loanController.delete);

module.exports = router;