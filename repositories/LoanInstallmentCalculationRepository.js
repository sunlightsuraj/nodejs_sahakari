var connection = require('../database/connection');
var LoanInstallmentCalculation = require('../models/LoanInstallmentCalculation');

module.exports = class LoanInstallmentCalculationRepository {
    getLoanInstallmentCalculations() {
        return new Promise((resolve, reject) => {
            connection.query("select * from loan_installment_calculations where deleted_at is null", (err, results) => {
                console.log ('results:', results);
                if (err) {
                    console.log(err);
                    reject(null);

                }

                // resolve (results);

                let loan_installment_calculations = [];
                results.forEach(result => {
                    let loan_installment_calculation = new LoanInstallmentCalculation();
                    loan_installment_calculation = Object.assign(loan_installment_calculation, result)
                    loan_installment_calculations.push(loan_installment_calculation);
                });
                resolve(loan_installment_calculations);
            });            
        });
    }

    getLoanInstallmentCalculationByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from loan_installment_calculations where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let loan_installment_calculation = new LoanInstallmentCalculation();
                loan_installment_calculation = Object.assign(loan_installment_calculation, result);
                resolve(results[0]);
            });
        });
    }

    saveLoanInstallmentCalculation(loaninstallmentcalculation) {
        return new Promise((resolve, reject) => {
            connection.query("insert into loan_installment_calculations set ?",
                loaninstallmentcalculation,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateLoanInstallmentCalculationByCode(loaninstallmentcalculation, code) {
        return new Promise((resolve, reject) => {
            connection.query("update loan_installment_calculations set ? where code = ?", [loaninstallmentcalculation, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteLoanInstallmentCalculation(code) {
        return new Promise((resolve, reject) => {
            connection.query("update loan_installment_calculations set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

}