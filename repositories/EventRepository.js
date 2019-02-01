var connection = require('../database/connection');
var Event = require('../models/Event');

module.exports = class EventRepository {
    getEvents() {
        return new Promise((resolve, reject) => {
            connection.query("select * from events where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);

                let events = [];
                results.forEach(result => {
                    let event = new Event();
                    event = Object.assign(event, result);
                    events.push(event);
                });
                resolve(events);
            });
        });
    }

    getEventByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from events where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let event = new Event();
                event = Object.assign(event, result);
                resolve(event);
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

    updateEventByCode(event, code) {
        return new Promise((resolve, reject) => {
            connection.query("update events set ? where code = ?", [event, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    
    deleteEvent(code) {
        return new Promise((resolve, reject) => {
            connection.query("update events set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};