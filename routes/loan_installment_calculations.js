var express = require('express');
var router = express.Router();
var LoanInstallmentCalculationRepository = require("../repositories/LoanInstallmentCalculationRepository");
var loan_installment_calculationRepository = new LoanInstallmentCalculationRepository();


router.get('/', async (req, res) => {
    var loan_installment_calculationList = await loan_installment_calculationRepository.getLoanInstallmentCalculations();
    console.log('LoanInstallmentCalculation List: ', loan_installment_calculationList);
    res.json(loan_installment_calculationList);
});

router.get('/:code', async (req, res) => {
    var code = req.params.code;
    var loan_installment_calculation = await loan_installment_calculationRepository.getLoanInstallmentCalculationByCode(code);
    res.send(loan_installment_calculation);
});

router.post('/', async (req, res) => {
    var data = req.body;

    var loan_installment_calculation_1 = {
        code: data.code,
        user_code: data.user_code,
        loan_code: data.loan_code,
        installment_amount: data.installment_amount,
        interest_amount: data.interest_amount,
        installment_number: data.installment_number,
        payment_date: data.payment_date,
        status: data.status,
        created_by: data.created_by,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    };
    var loan_installment_cal = await loan_installment_calculationRepository.saveLoanInstallmentCalculation(loan_installment_calculation_1);
    res.send(loan_installment_calculation_1);
});    

router.put('/', async (req, res) => {
    var data = req.body;
    var code = data.code;

    var loan_installment_calculation = await loan_installment_calculationRepository.getLoanInstallmentCalculationByCode(code);
    console.log(loan_installment_calculation);
    if (loan_installment_calculation) {
        // data exists, update data
        await loan_installment_calculationRepository.updateLoanInstallmentCalculationByCode(data, code);
    } else {
        // data doesn't exists, create new data
        await loan_installment_calculationRepository.saveLoanInstallmentCalculation(data);
    }

    res.status(200).json();
});


router.patch('/:code', async (req, res) => {
    var code = req.params.code;
    var data = req.body;
    var loan_installment_calculation = await loan_installment_calculationRepository.updateLoanInsatallmentCalculationByCode(data, code);

    res.status(200).send(loan_installment_calculation);
});

router.delete('/:code', async (req, res) => {
    var code = req.params.code;
    var result = loan_installment_calculationRepository.deleteLoanInstallmentCalculation(code);
    res.send(result);
});


module.exports = router;