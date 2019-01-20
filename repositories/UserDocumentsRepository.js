var connection = require('../database/connection');

module.exports = class UserDocumentsRepository {
    getuserdocuments() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_documents", (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
    getUserDocumentsByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_documents where code = ? and deleted_at is null", code,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results[0]);
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