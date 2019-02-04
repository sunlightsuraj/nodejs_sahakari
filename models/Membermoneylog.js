var crypto = require('crypto');

module.exports = class Membermoneylog {

    constructor(id = null,code = this.generateCode(), user_code = null, balance = 0 , balance_date = null,tran_type = null,tran_code = null, status = 1, created_by = null,
        created_at  = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.user_code = user_code;
        this.balance = balance;
        this.balance_date = balance_date ;
        this.tran_type = tran_type;
        this.tran_code = tran_code;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Membermoneylog.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};