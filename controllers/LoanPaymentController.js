var LoanPaymentRepository = require('../repositories/LoanPaymentRepository');
var loanPaymentRepository = new LoanPaymentRepository();
var LoanPayment = require('../models/LoanPayment');

var loanpaymentController = {
    index: async (req, res) => {
        var loanpaymentList = await loanPaymentRepository.getLoanPayments();

        loanpaymentList.forEach(loanpaymentList => {
            console.log(loanpaymentList.printIDandCode());
        });
        
        res.json(loanpaymentList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var loan_payment = await loanPaymentRepository.getLoanPaymentsByCode(code);
        console.log(loan_payment.printIDandCode());
        res.send(loan_payment);
    },

    save: async (req, res) => {
        var data = req.body;
    
        var loanpayment = new LoanPayment();
        console.log('Before', loanpayment);    
        loanpayment.user_code = data.user_code;
        loanpayment.loan_code = data.loan_code;
        loanpayment.payment_amount = data.payment_amount;
        loanpayment.payment_date = data.payment_date;
        loanpayment.payment_type = data.payment_type;
        loanpayment.collected_by = data.collected_by;
        loanpayment.verified_by = data.verified_by;
        loanpayment.ref_code = data.ref_code;
        loanpayment.installment_code = data.installment_code;
        loanpayment.status = data.status;
        loanpayment.created_by = data.created_by;
        loanpayment.created_at = data.created_at;
        loanpayment.updated_at = data.updated_at;
        loanpayment.deleted_at = data.deleted_at;

        console.log('After', loanpayment);
        
        var loan_pay = await loanPaymentRepository.saveLoanPayment(loanpayment);
        res.send(loanpayment);
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;
    
        var loan_payment = await loanPaymentRepository.getLoanPaymentByCode(code);
        console.log(loan_payment);
        if (loan_payment) {
            // data exists, update data
            await loanPaymentRepository.updateLoanPaymentByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await loanPaymentRepository.saveLoanPayment(data);
        }
    
        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var loan_payment = await loanPaymentRepository.updateLoanPaymentByCode(data, code);
    
        res.status(200).send();
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = loanPaymentRepository.deleteLoanPayment(code);
        res.send(result);
    }
    
};

module.exports = loanpaymentController;