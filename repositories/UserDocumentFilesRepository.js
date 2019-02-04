var connection = require('../database/connection');
var UserDocumentFiles = require('../models/UserDocumentFile');

module.exports = class UserDocumentFilesRepository {
    getUserDocumentFiles() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_document_files where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);
                let userdocumentfiles = [];
                results.forEach(result => {
                    let userdocumentfile = new UserDocumentFiles();
                    userdocumentfile = Object.assign(userdocumentfile, result);
                    userdocumentfiles.push(userdocumentfile);
                });
                resolve(userdocumentfiles);
            });
        });
    }

    getUserDocumentFilesByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_document_files where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let userdocumentfiles = new UserDocumentFiles();
                userdocumentfiles = Object.assign(userdocumentfiles, result);
                resolve(userdocumentfiles);
            });
        });
    }
    saveUserDocumentFiles(userdocumentfiles) {
        return new Promise((resolve, reject) => {
            connection.query("insert into user_document_files set ?", userdocumentfiles,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }
    updateUserDocumentFilesByCode(updateUserDocumentFilesByCode, code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_document_files set ? where code = ?", [userdocumentfiles, code],
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }
    deleteUserDocumentFilesByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_document_files set deleted_at = current_timestamp where code = ?", code,
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