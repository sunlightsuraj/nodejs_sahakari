var connection = require('../database/connection');

module.exports = class LoanRepository {
    getLoans() {
        return new Promise((resolve, reject) => {
            connection.query("select * from loans where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                // resolve(results);

                let loans = [];
                results.forEach(result => {
                    let loan = new Loan();
                    loan = Object.assign(loan, result);
                    loans.push(loan);
                });
                resolve(loans);
            });
        });
    }

    getLoanByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from loans where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                
                let result = results[0];
                let loan = new Loan();
                loan = Object.assign(loan, results);
                resolve(loan);
            });
        });
    }

    saveLoan(loan) {
        return new Promise((resolve, reject) => {
            connection.query("insert into loans set ?",
                loan,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    
                    resolve(results);
                });
        });
    }

    updateLoanByCode(loan, code) {
        return new Promise((resolve, reject) => {
            connection.query("update loans set ? where code = ?", [loan, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteLoan(code) {
        return new Promise((resolve, reject) => {
            connection.query("update loans set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

}