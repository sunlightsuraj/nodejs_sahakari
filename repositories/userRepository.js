var connection = require('../database/connection.js');

module.exports = class UserRepository {
    getusers() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }


                resolve(results);
            })
        })
    }
    getUserByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from user where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results[0]);
            });
        });
    }
    saveUser(user) {
        return new Promise((resolve, reject) => {
            connection.query("insert into user set ?",
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
            connection.query("update user set ? where code = ?", [user, code], (err, results) => {
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
            connection.query("update user set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};

