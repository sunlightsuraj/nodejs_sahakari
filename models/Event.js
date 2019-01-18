var connection = require('../database/connection');

module.exports = class Event {
    getEvents() {
        return new Promise((resolve, reject) => {
            connection.query("select * from events", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                resolve(results);
            });
        });
    }

    saveEvent(event) {
        return new Promise((resolve, reject) => {
            connection.query("insert into events set ?",
                event,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }
};