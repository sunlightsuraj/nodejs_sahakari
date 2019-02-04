var express = require('express');
var router = express.Router();
var loaninstallmentcalculationController = require('../controllers/LoanInstallmentCalculationController');

router.get('/', loaninstallmentcalculationController.index);

router.get('/:code', loaninstallmentcalculationController.show);

router.post('/', loaninstallmentcalculationController.save);

router.put('/', loaninstallmentcalculationController.updateOrInsert);

router.patch('/:code', loaninstallmentcalculationController.update);

router.delete('/:code', loaninstallmentcalculationController.delete);


module.exports = router;