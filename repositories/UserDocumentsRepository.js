var connection = require('../database/connection');
var UserDocuments = require('../models/UserDocument');

module.exports = class UserDocumentsRepository {
    getUserDocuments() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_documents where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);
                let userdocuments = [];
                results.forEach(result => {
                    let userdocument = new UserDocuments();
                    userdocument = Object.assign(userdocument, result);
                    userdocuments.push(userdocument);
                });
                resolve(userdocuments);
            });
        });
    }

    getUserDocumentsByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_documents where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let userdocuments = new UserDocuments();
                userdocuments = Object.assign(userdocuments, result);
                resolve(userdocuments);
            });
        });
    }
    saveUserDocuments(userdocuments) {
        return new Promise((resolve, reject) => {
            connection.query("insert into user_documents set ?", userdocuments,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }
    updateUserDocumentsByCode(userdocuments, code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_documents set ? where code = ?", [userdocuments, code],
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }
    deleteUserDocumentsByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_documents set deleted_at = current_timestamp where code = ?", code,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                })
        })
    }
};