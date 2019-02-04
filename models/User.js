var crypto = require('crypto');

module.exports = class User {
    constructor(id = null, code = this.generatecode(), user_type_code = null, first_name = null, middle_name = null, last_name = null,
     permanent_address = null, current_address = null, phone = null, email = null, date_of_birth = 0, occupation = null,
     gender = null, business = null, father_name = null, grand_father_name = null, nominee_code = null, verified_date = 0, verified_by = null, can_login = 1, 
     status = 1, created_by = null, created_at = new Date(), updated_at = new Date(), deleted_at = null){
        this.id = id;
        this.code = code;
        this.user_type_code = user_type_code;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.permanent_address = permanent_address;
        this.current_address = current_address;
        this.phone = phone;
        this.email = email;
        this.date_of_birth = date_of_birth;
        this.occupation = occupation;
        this.gender = gender;
        this.business = business;
        this.father_name = father_name;
        this.grand_father_name = grand_father_name;
        this.nominee_code = nominee_code;
        this.verified_date = verified_date;
        this.verified_by = verified_by;
        this.can_login = can_login;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(User.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};
