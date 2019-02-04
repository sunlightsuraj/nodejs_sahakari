var crypto = require('crypto');

module.exports = class UserDocument {

    constructor(id = null, code = this.generateCode(), user_code = null, document_type_code = null, document_number = null, description = null, status = 1, created_by = null,
        created_at = new Date(), updated_at = new Date(), deleted_at = null) {
        this.id = id;
        this.code = code;
        this.user_code = user_code;
        this.document_type_code = document_type_code;
        this.document_number = document_number;
        this.description = description;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(UserDocument.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};