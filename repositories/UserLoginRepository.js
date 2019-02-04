var connection = require('../database/connection');
var UserLogin = require('../models/UserLogin');

module.exports = class UserloginRepository {
    getUserLogins() {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_login", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }


                // resolve(results);

                let user_login = [];
                results.forEach(result => {
                    let user_login = new UserLogin();
                    user_login = Object.assign(user_login, result);
                    user_login.push(user_login);
                    
                });
                resolve(user_login);
            });
        });
    }
    getUserLoginByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from user_login where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

               let result = results[0];
               let user_login = new UserLogin();
               user_login = Object.assign(user_login, result);
               resolve(user_login);
            });
        });
    }
    saveUserLogin(userlogin) {
        return new Promise((resolve, reject) => {
            connection.query("insert into user_login set ?",
                userlogin,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    };
    updateUserLoginByCode(userlogin, code) {
        return new Promise((resolve, reject) => {
            connection.query("update user_login set ? where code = ?", [userlogin, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

deleteUserLogin(code) {
    return new Promise((resolve, reject) => {
        connection.query("update user_login set deleted_at = current_timestamp where code = ?", code, (err, results) => {
            if (err) {
                console.log(err);
                reject(null);
            }
            resolve(results);
        });
    });
}
}
