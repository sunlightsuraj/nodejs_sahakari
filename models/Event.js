var crypto = require('crypto');

module.exports = class Event {

    constructor(id = null,code = this.generateCode(), event_title = null, event_fees = 0, event_duration = 0, event_start_date = null,description = null, status = 1, created_by = null,
        created_at  = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.event_title = event_title;
        this.event_fees = event_fees;
        this.event_duration = event_duration;
        this.event_start_date = event_start_date;
        this.description = description;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Event.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};