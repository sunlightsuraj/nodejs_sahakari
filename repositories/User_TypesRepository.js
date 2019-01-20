var connection = require('../database/connection');

module.exports = class User_TypesRepository {
    getUser_Types() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_types where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results);
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

                resolve(results[0]);
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