var express = require('express');
var router  = express.Router();
var LoanRepository = require("../repositories/LoanRepository");
var loanRepository = new LoanRepository();


router.get('/', async (req, res) => {
    var loanList = await loanRepository.getLoans();
    console.log('Loan List: ', loanList);
    res.json(loanList);
});

router.get('/:code', async (req, res) => {
    var code = req.params.code;
    var loan = await loanRepository.getLoanByCode(code);
    res.send(loan);
});

router.post('/', async (req, res) => {
    var data = req.body;

    var loan_1 = {
        code: data.code,
        user_code: data.user_code,
        loan_amount: data.loan_amount,
        maturity_date: data.maturity_date,
        request_date: data.request_date,
        issue_date: data.issue_date,
        approve_date: data.approve_date,
        interest_rate: data.interest_rate,
        approved_by: data.approved_by,
        installment_days: data.installment_days,
        remarks: data.remarks,
        status: data.status,
        created_by: data.created_by,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    };
    var lon = await loanRepository.saveLoan(loan_1);
    res.send(loan_1);
});

router.put('/', async (req, res) => {
    var data = req.body;
    var code = data.code;

    var loan = await loanRepository.getLoanByCode(code);
    console.log(loan);
    if (loan) {
        // data exists, update data
        await loanRepository.updateLoanByCode(data, code);
    } else {
        // data doesn't exists, create new data
        await loanRepository.saveLoan(data);
    }

    res.status(200).json();
});


router.patch('/:code', async (req, res) => {
    var code = req.params.code;
    var data = req.body;
    var loan = await loanRepository.updateLoanByCode(data, code);

    res.status(200).send();
});

router.delete('/:code', async (req, res) => {
    var code = req.params.code;
    var result = loanRepository.deleteLoan(code);
    res.send(result);
});


module.exports = router;