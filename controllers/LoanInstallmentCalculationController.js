var LoanInstallmentCalculationRepository = require("../repositories/LoanInstallmentCalculationRepository");
var loanInstallmentCalculationRepository = new LoanInstallmentCalculationRepository();
var LoanInstallmentCalculation = require('../models/LoanInstallmentCalculation');

var loaninstallmentcalculationController = {
    index: async (req, res) => {
        var loan_installment_calculationList = await loanInstallmentCalculationRepository.getLoanInstallmentCalculations();

        loan_installment_calculationList.forEach(loan_installment_calculationList => {
             console.log(loan_installment_calculationList.printIDandCode());
        });
       
        res.json(loan_installment_calculationList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var loan_installment_calculation = await loanInstallmentCalculationRepository.getLoanInstallmentCalculationByCode(code);
        console.log(loan_installment_calculation.printIDandCode());
        res.send(loan_installment_calculation);
    },

    save: async (req, res) => {
        var data = req.body;
    
        var loan_installment_calculation = new LoanInstallmentCalculation();
        console.log('Before', loan_installment_calculation);   
        user_code: data.user_cod = 
        loan_installment_calculation.loan_code = data.loan_code;
        loan_installment_calculation.installment_amount = data.installment_amount;
        loan_installment_calculation.interest_amount = data.interest_amount;
        loan_installment_calculation.installment_number = data.installment_number;
        loan_installment_calculation.payment_date = data.payment_date;
        loan_installment_calculation.status = data.status;
        loan_installment_calculation.created_by = data.created_by;
        loan_installment_calculation.created_at = data.created_at;
        loan_installment_calculation.updated_at = data.updated_at;
        loan_installment_calculation.deleted_at = data.deleted_at;
        

        console.log('After', loan_installment_calculation);

        var loan_installment_cal = await loanInstallmentCalculationRepository.saveLoanInstallmentCalculation(loan_installment_calculation);
        res.send(loan_installment_calculation);
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;
    
        var loan_installment_calculation = await loanInstallmentCalculationRepository.getLoanInstallmentCalculationByCode(code);
        console.log(loan_installment_calculation);
        if (loan_installment_calculation) {
            // data exists, update data
            await loanInstallmentCalculationRepository.updateLoanInstallmentCalculationByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await loanInstallmentCalculationRepository.saveLoanInstallmentCalculation(data);
        }
    
        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var loan_installment_calculation = await loanInstallmentCalculationRepository.updateLoanInsatallmentCalculationByCode(data, code);
    
        res.status(200).send(loan_installment_calculation);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = loanInstallmentCalculationRepository.deleteLoanInstallmentCalculation(code);
        res.send(result);
    },
    
};

module.exports = loaninstallmentcalculationController;