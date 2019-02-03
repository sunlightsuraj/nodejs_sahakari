
var connection = require('../database/connection');
var Eventcollection = require('../models/Eventcollection');

module.exports = class EventcollectionRepository {
    getEventcollections() {
        return new Promise((resolve, reject) => {
            connection.query("select * from event_collections where deleted_at is null", (err, results) => {
                console.log('results: ', results);
                if (err) {
                    console.log(err);
                    reject(null);
                }

                //resolve(results);

                let eventcollections = [];
                results.forEach(result => {
                    let eventcollection = new Eventcollection();
                    eventcollection = Object.assign(eventcollection, result);
                    eventcollections.push(eventcollection);
                });
                resolve(eventcollections);
            });
        });
    }

    getEventcollectionByCode(code) {
        return new Promise((resolve, reject) => {
            connection.query("select * from event_collections where code = ? and deleted_at is null", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }

                let result = results[0];
                let eventcollection = new Eventcollection();
                eventcollection = Object.assign(eventcollection, result);
                resolve(eventcollection);
            });
        });
    }

    saveEventcollection(eventcollection) {
        return new Promise((resolve, reject) => {
            connection.query("insert into event_collections set ?",
                eventcollection,
                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(null);
                    }
                    resolve(results);
                });
        });
    }

    updateEventcollectionByCode(eventcollection, code) {
        return new Promise((resolve, reject) => {
            connection.query("update event_collections set ? where code = ?", [eventcollection, code], (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }

    
    deleteEventcollection(code) {
        return new Promise((resolve, reject) => {
            connection.query("update event_collections set deleted_at = current_timestamp where code = ?", code, (err, results) => {
                if (err) {
                    console.log(err);
                    reject(null);
                }
                resolve(results);
            });
        });
    }
};