var connection = require('../database/connection');

module.exports = class LoanInstallmentCalculationRepository {
    getLoanInstallmentCalculations() {
        return new Promise((resolve, reject) => {
            connection.query("select * from loan_installment_calculations where deleted_at is null", (err, results) => {
                console.log ('results:', results);
                if (err) {
                    console.log(err);
                    reject(null);

                }

                resolve (results);
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