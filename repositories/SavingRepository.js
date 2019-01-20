var connection = require('../database/connection');

module.exports = class SavingRepository {
    getSavings() {
        return new Promise((resolve, reject) => {
            connection.query("select * from savings where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results);
            });
        });
    }

    getSavingByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from savings where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results[0]);
            });
        });
    }

    saveSaving(savings) {
        return new Promise((resolve, reject) => {
            connection.query("insert into savings set ?",
                savings,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateSavingByCode(savings, code) {
        return new Promise((resolve, reject) => {
            connection.query("update savings set ? where code = ?", [savings, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteSaving(code) {
        return new Promise((resolve, reject) => {
            connection.query("update savings set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};