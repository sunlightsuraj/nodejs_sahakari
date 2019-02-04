var crypto = require('crypto');

module.exports = class User_types {

    constructor(id = null, code = this.generateCode(), user_type_title = null, user_type_short_code = null, status = 1, created_by = null,
        created_at = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.user_type_title = user_type_title;
        this.user_type_short_code = user_type_short_code;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(User_types.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};