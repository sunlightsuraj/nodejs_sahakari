var express = require('express');
var router = express.Router();
var LoanPaymentRepository = require("../repositories/LoanPaymentRepository");
var loanpaymentRepository = new LoanPaymentRepository();

router.get('/', async (req, res) => {
    var loanpaymentList = await loanpaymentRepository.getLoanPayments();
    console.log('LoanPayment List:', loanpaymentList);
    res.json(loanpaymentList);
});

router.get('/:code', async (req, res) => {
    var code = req.params.code;
    var loan_payment = await loanRepository.getLoanPaymentsByCode(code);
    res.send(loan_payment);
});

router.post('/', async (req, res) => {
    var data = req.body;

    var loan_payment = {
        code: data.code,
        user_code: data.user_code,
        loan_code: data.loan_code,
        payment_amount: data.payment_amount,
        payment_date: data.payment_date,
        payment_type: data.payment_type,
        collected_by: data.collected_by,
        verified_by: data.verified_by,
        ref_code: data.ref_code,
        installment_code: data.installment_code,
        status: data.status,
        created_by: data.created_by,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    };
    var loan_pay = await loanpaymentRepository.saveLoanPayment(loan_payment);
    res.send(loan_payment);
});

router.put('/', async (req, res) => {
    var data = req.body;
    var code = data.code;

    var loan_payment = await loanpaymentRepository.getLoanPaymentByCode(code);
    console.log(loan_payment);
    if (loan_payment) {
        // data exists, update data
        await loanpaymentRepository.updateLoanPaymentByCode(data, code);
    } else {
        // data doesn't exists, create new data
        await loanpaymentRepository.saveLoanPayment(data);
    }

    res.status(200).json();
});


router.patch('/:code', async (req, res) => {
    var code = req.params.code;
    var data = req.body;
    var loan_payment = await loanpaymentRepository.updateLoanPaymentByCode(data, code);

    res.status(200).send();
});

router.delete('/:code', async (req, res) => {
    var code = req.params.code;
    var result = loanpaymentRepository.deleteLoanPayment(code);
    res.send(result);
});


module.exports = router;