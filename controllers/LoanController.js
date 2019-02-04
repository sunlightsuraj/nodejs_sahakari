var LoanRepository = require("../repositories/LoanRepository");
var loanRepository = new LoanRepository();
var Loan = require('../models/Loan');

var loanController = {
    index: async (req, res) => {
        var loans = await loanRepository.getLoans();

        loans.forEach(loan => {
            console.log(loan.printIDandCode());
        });

        res.json(loans);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var loan = await loanRepository.getLoanByCode(code);
        console.log(loan.printIDandCode());
        res.send(loan);
    },

    save: async (req, res) => {
        var data = req.body;
    
        var loan = new Loan();
        console.log('Before', loan);         
        loan.user_code = data.user_code,
        loan.loan_amount = data.loan_amount,
        loan.maturity_date = data.maturity_date,
        loan.request_date = data.request_date,
        loan.issue_date = data.issue_date,
        loan.approve_date = data.approve_date,
        loan.interest_rate = data.interest_rate,
        loan.approved_by = data.approved_by,
        loan.installment_days =  data.installment_days,
        loan.remarks = data.remarks,
        loan.status = data.status,
        loan.created_by = data.created_by,

        console.log('After', loan);
            
        var lon = await loanRepository.saveLoan(loan);
        res.status(201);
        res.send();
       
    },

    updateOrInsert: async (req, res) => {
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
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var loan = await loanRepository.updateLoanByCode(data, code);
    
        res.status(200).send();
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = loanRepository.deleteLoan(code);
        res.send(result);
    }
};

module.exports = loanController;
