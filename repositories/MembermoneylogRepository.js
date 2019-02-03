var connection = require('../database/connection');
var Membermoneylog = require('../models/Membermoneylog');
module.exports = class MembermoneylogRepository {
    getMembermoneylogs() {
        return new Promise((resolve, reject) => {
            connection.query("select * from member_money_logs where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);
                let membermoneylogs = [];
                results.forEach(result => {
                    let membermoneylog = new Membermoneylog();
                    membermoneylog = Object.assign(membermoneylog, result);
                    membermoneylogs.push(membermoneylog);
                });
                resolve(membermoneylogs);
            });
        });
    }

    getMembermoneylogByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from member_money_logs where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let membermoneylog = new Membermoneylog();
                membermoneylog = Object.assign(membermoneylog, result);
                resolve(membermoneylog);
            });
        });
    }

    saveMembermoneylog(membermoneylogs) {
        return new Promise((resolve, reject) => {
            connection.query("insert into member_money_logs set ?",
                membermoneylogs,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateMembermoneylogByCode(membermoneylogs, code) {
        return new Promise((resolve, reject) => {
            connection.query("update member_logs? where code = ?", [membermoneylogs, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    deleteMembermoneylog(code) {
        return new Promise((resolve, reject) => {
            connection.query("update membermoneylogs set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};