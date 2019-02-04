var crypto = require('crypto');

module.exports = class Saving {

    constructor(id = null,code = this.generateCode(), saving_amount = 0, collected_date = null, collected_for_date = null, user_code = null,collected_by = null,ref_code = null,verified_by = null, status = 1, created_by = null,
        created_at  = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.saving_amount = saving_amount;
        this.collected_date = collected_date ;
        this.collected_for_date = collected_for_date;
        this.user_code = user_code;
        this.collected_by = collected_by;
        this.ref_code = ref_code;
        this.verified_by = verified_by;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Saving.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};