var EventcollectionRepository = require("../repositories/EventcollectionRepository");
var eventcollectionRepository = new EventcollectionRepository();
var Eventcollection = require('../models/Eventcollection');

var eventcollectionController = {
    index: async(req, res) => {
        var eventcollections = await eventcollectionRepository.getEventcollections();
        
        eventcollections.forEach(eventcollection => {
            console.log(eventcollection.printIDandCode());
        });

        res.json(eventcollections);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var eventcollection = await eventcollectionRepository.getEventcollectionByCode(code);
        console.log(eventcollection.printIDandCode());
        res.send(eventcollection);
    },

    save: async (req, res) => {
        var data = req.body;
    
        var eventcollection = new Eventcollection();
        console.log('Before', eventcollection);
        eventcollection.user_code = data.user_code;
        eventcollection.event_code = data.event_code;
        eventcollection.payment_date = data.payment_date;
        eventcollection.ref_code = data.ref_code;
        eventcollection.collected_by = data.collected_by;
        eventcollection.status = data.status;
        eventcollection.created_by = data.created_by;

        console.log('After', eventcollection);

        var evt = await eventcollectionRepository.saveEventcollection(eventcollection);
        res.status(201);
        res.send();
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;
        
        var eventcollection = await eventcollectionRepository.getEventcollectionByCode(code);
        console.log(eventcollection);
        if (eventcollection) {
            // data exists, update data
            await eventcollectionRepository.updateEventcollectionByCode(data, code);
        } else {
            let eventcollection = new Eventcollection();
            eventcollection = Object.assign(eventcollection, data);

            // data doesn't exists, create new data
            await eventcollectionRepository.saveEventcollection(eventcollection);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var eventcollection = await eventcollectionRepository.updateEventcollectionByCode(data, code);

        res.send(eventcollection);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = eventcollectionRepository.deleteEventcollection(code);
        res.send(result);
    }
};

module.exports = eventcollectionController;