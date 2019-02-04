var express = require('express');
var router = express.Router();
var loanpaymentController = require('../controllers/LoanPaymentController');

router.get('/', loanpaymentController.index);

router.get('/:code', loanpaymentController.show);

router.post('/', loanpaymentController.save);

router.put('/', loanpaymentController.updateOrInsert);

router.patch('/:code', loanpaymentController.update);

router.delete('/:code', loanpaymentController.delete);

module.exports = router;