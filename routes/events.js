var express = require('express');
var router = express.Router();
var Event = require("../models/Event");
var event = new Event();

router.get('/', async (req, res) => {
    var eventList = await event.getEvents();
    console.log('Event List: ', eventList);
    res.json(eventList);
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
    var evt = await event.saveEvent(event_1);
    res.send(event_1);
});

module.exports = router;