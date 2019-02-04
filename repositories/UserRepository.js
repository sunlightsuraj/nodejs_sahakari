var connection = require('../database/connection');
var User = require('../models/User');
var table_name = 'users';

module.exports = class UserRepository {
    getusers() {
        return new Promise((resolve, reject) => {
            connection.query("select * from " + table_name, (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }


                // resolve(results);

                let users = [];
                results.forEach(result => {
                    let user = new User();
                    event = Object.assign(user, result);
                    users.push(user);
                });
                resolve(users);
            })
        })
    }
    getUserByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from " + table_name + " where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let user = new User();
                user = Object.assign(user, result);
                resolve(user);
            });
        });
    }
    saveUser(user) {
        return new Promise((resolve, reject) => {
            connection.query("insert into " + table_name + " set ?",
                user,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    };
    updateUserByCode(user, code) {
        return new Promise((resolve, reject) => {
            connection.query("update" + table_name + "set ? where code = ?", [user, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
    deleteUser(code) {
        return new Promise((resolve, reject) => {
            connection.query("update" + table_name + "set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};

