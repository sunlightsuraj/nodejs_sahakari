var EventRepository = require("../repositories/EventRepository");
var eventRepository = new EventRepository();

var eventController = {
    index: async(req, res) => {
        var eventList = await eventRepository.getEvents();
        console.log('Event List: ', eventList);
        res.json(eventList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var event = await eventRepository.getEventByCode(code);
        res.send(event);
    },

    save: async (req, res) => {
        var data = req.body;
        var event_1 = {
            code: data.code,
            event_title: data.event_title,
            event_fees: data.event_fees,
            event_duration: data.event_duration,
            event_start_date: data.event_start_date,
            description: data.description,
            status: data.status,
            created_by: data.created_by,
            created_at: new Date(),
            updated_at: new Date()
        };
        var evt = await eventRepository.saveEvent(event_1);
        res.send(event_1);
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
            // data doesn't exists, create new data
            await eventRepository.saveEvent(data);
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