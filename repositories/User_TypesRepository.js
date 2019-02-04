var connection = require('../database/connection');
var User_types= require('../models/User_types');

module.exports = class User_TypesRepository {
    getUser_Types() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_types where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);
                let user_types = [];
                results.forEach(result => {
                    let user_type = new User_types();
                    user_type = Object.assign(user_type, result);
                    user_types.push(user_type);
                });
                resolve(user_types);
            });
        });
    }

    getUser_TypesByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_types where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let user_types = new User_Types();
                user_types = Object.assign(user_types, result);
                resolve(user_types);
            });
        });
    }

    saveUser_Types(user_types) {
        return new Promise((resolve, reject) => {
            connection.query("insert into user_types set ?",
               user_types,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateUser_TypesByCode(user_types, code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_types set ? where code = ?", [user_types, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteUser_Types(code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_types set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};