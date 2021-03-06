var connection = require('../database/connection');
var Savingwithdraw = require('../models/Savingwithdraw')
module.exports = class SavingwithdrawRepository {
    getSavingwithdraws() {
        return new Promise((resolve, reject) => {
            connection.query("select * from saving_withdraws where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);
                let savingwithdraws = [];
                results.forEach(result => {
                    let savingwithdraw = new Savingwithdraw();
                    savingwithdraw = Object.assign(savingwithdraw, result);
                    savingwithdraws.push(savingwithdraw);
                });
                resolve(savingwithdraws);
            });
        });
    }

    getSavingwithdrawByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from saving_withdraws where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let savingwithdraw = new Savingwithdraw();
                savingwithdraw = Object.assign(savingwithdraw, result);
                resolve(savingwithdraw);
            });
        });
    }

    saveSavingwithdraw(savingwithdraws) {
        return new Promise((resolve, reject) => {
            connection.query("insert into saving_withdraws set ?",
                savingwithdraws,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateSavingwithdrawByCode(savingwithdraw, code) {
        return new Promise((resolve, reject) => {
            connection.query("update saving_withdraws set ? where code = ?", [savingwithdraw, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteSavingwithdraw(code) {
        return new Promise((resolve, reject) => {
            connection.query("update saving_withdraws set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};