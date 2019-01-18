var express = require('express');
var router = express.Router();
var EventRepository = require("../repositories/EventRepository");
var eventRepository = new EventRepository();

router.get('/', async (req, res) => {
    var eventList = await eventRepository.getEvents();
    console.log('Event List: ', eventList);
    res.json(eventList);
});

router.get('/:code', async (req, res) => {
    var code = req.params.code;
    var event = await eventRepository.getEventByCode(code);
    res.send(event);
});

router.post('/', async (req, res) => {
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
});

router.put('/:code', async (req, res) => {
    var code = req.params.code;
    
    res.send(code);
});

router.delete('/:code', async (req, res) => {
    var code = req.params.code;
    var result = eventRepository.deleteEvent(code);
    res.send(result);
});

module.exports = router;