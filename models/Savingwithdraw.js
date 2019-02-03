var crypto = require('crypto');

module.exports = class Savingwithdraw {

    constructor(id = null,code = this.generateCode(), user_code = null, balance = 0 , withdraw_amount = 0 , withdraw_date = null, status = 1, created_by = null,
        created_at  = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.user_code = user_code;
        this.balance = balance;
        this.withdraw_amount = withdraw_amount ;
        this.withdraw_date = withdraw_date;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Savingwithdraw.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};