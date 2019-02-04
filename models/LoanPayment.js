var crypto = require('crypto');

module.exports = class LoanPayment {
    constructor(id = null, code = this.generateCode(), user_code = null, loan_code = null, payment_amount = 0, payment_date = 0, payment_type = null,
    collected_by = null, verified_by = null, ref_code = 0, installment_code = 0, status = 1, created_by = null,
    created_at = new Date(), updated_at = new Date(), deleted_at = null,){
        this.id = id;
        this.code = code;
        this.user_code = user_code;
        this.loan_code = user_code;
        this.payment_amount = payment_amount;
        this.payment_date = payment_date;
        this.payment_type = payment_type;
        this.collected_by = collected_by;
        this.verified_by = verified_by;
        this.ref_code = ref_code;
        this.installment_code = installment_code;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;

    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(LoanPayment.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }
};
