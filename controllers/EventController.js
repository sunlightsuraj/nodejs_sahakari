var EventRepository = require("../repositories/EventRepository");
var eventRepository = new EventRepository();
var Event = require('../models/Event');

var eventController = {
    index: async(req, res) => {
        var events = await eventRepository.getEvents();
        
        events.forEach(event => {
            console.log(event.printIDandCode());
        });

        res.json(events);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var event = await eventRepository.getEventByCode(code);
        console.log(event.printIDandCode());
        res.send(event);
    },

    save: async (req, res) => {
        var data = req.body;
    
        var event = new Event();
        console.log('Before', event);
        event.event_title = data.event_title;
        event.event_fees = data.event_fees;
        event.event_duration = data.event_duration;
        event.event_start_date = data.event_start_date;
        event.description = data.description;
        event.status = data.status;
        event.created_by = data.created_by;

        console.log('After', event);

        var evt = await eventRepository.saveEvent(event);
        res.status(201);
        res.send();
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;
        
        var event = await eventRepository.getEventByCode(code);
        console.log(event);
        if (event) {
            // data exists, update data
            await eventRepository.updateEventByCode(data, code);
        } else {
            let event = new Event();
            event = Object.assign(event, data);

            // data doesn't exists, create new data
            await eventRepository.saveEvent(event);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var event = await eventRepository.updateEventByCode(data, code);

        res.send(event);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = eventRepository.deleteEvent(code);
        res.send(result);
    }
};

module.exports = eventController;