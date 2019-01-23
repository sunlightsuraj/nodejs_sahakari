var connection = require('../database/connection');

module.exports = class LoanPaymentRepository {
    getLoanPayments() {
        return new Promise((resolve, reject) => {
            connection.query("select * from loan_payments where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results);
            });
        });
    }

    getLoanPaymentByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from loan_payments where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results[0]);
            });
        });
    }

    saveLoanPayment(loan_payments) {
        return new Promise((resolve, reject) => {
            connection.query("insert into loan_payments set ?",
                loan_payments,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateLoanPaymentByCode(loan_payments, code) {
        return new Promise((resolve, reject) => {
            connection.query("update loan_payments set ? where code = ?", [loan_payments, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteLoanPayment(code) {
        return new Promise((resolve, reject) => {
            connection.query("update loan_payments set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

}