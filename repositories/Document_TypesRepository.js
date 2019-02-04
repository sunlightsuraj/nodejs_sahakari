var connection = require('../database/connection');
var Document_types= require('../models/Document_types');

module.exports = class Document_TypesRepository {
    getDocument_Types() {
        return new Promise((resolve, reject) => {
            connection.query("select * from document_types where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);
                let document_types = [];
                results.forEach(result => {
                    let document_type = new Document_types();
                    document_type = Object.assign(document_type, result);
                    document_types.push(document_type);
                });
                resolve(document_types);
            });
        });
    }

    getDocument_TypesByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from document_types where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let document_types = new Document_Types();
                document_types = Object.assign(document_types, result);
                resolve(document_types);
            });
        });
    }

    saveDocument_Types(document_types) {
        return new Promise((resolve, reject) => {
            connection.query("insert into document_types set ?",
               document_types,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateDocument_TypesByCode(document_types, code) {
        return new Promise((resolve, reject) => {
            connection.query("update document_types set ? where code = ?", [document_types, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteDocument_Types(code) {
        return new Promise((resolve, reject) => {
            connection.query("update document_types set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};