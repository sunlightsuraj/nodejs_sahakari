var LoanInstallmentCalculationRepository = require("../repositories/LoanInstallmentCalculationRepository");
var loanInstallmentCalculationRepository = new LoanInstallmentCalculationRepository();

var loaninstallmentcalculationController = {
    index: async (req, res) => {
        var loan_installment_calculationList = await loanInstallmentCalculationRepository.getLoanInstallmentCalculations();
        console.log('LoanInstallmentCalculation List: ', loan_installment_calculationList);
        res.json(loan_installment_calculationList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var loan_installment_calculation = await loanInstallmentCalculationRepository.getLoanInstallmentCalculationByCode(code);
        res.send(loan_installment_calculation);
    },

    save: async (req, res) => {
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
        var loan_installment_cal = await loanInstallmentCalculationRepository.saveLoanInstallmentCalculation(loan_installment_calculation_1);
        res.send(loan_installment_calculation_1);
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