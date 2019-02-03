var crypto = require('crypto');

module.exports = class Eventcollection {

    constructor(id = null,code = this.generateCode(), user_code = null, event_code = null, payment_date= null, ref_code = null,collected_by = null, status = 1, created_by = null,
        created_at  = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.user_code = user_code;
        this.event_code = event_code;
        this.payment_date = payment_date;
        this.ref_code = ref_code;
        this.collected_by = collected_by;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Eventcollection.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};