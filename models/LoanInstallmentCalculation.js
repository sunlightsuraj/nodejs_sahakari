var crypto = require('crypto');

module.exports = class LoanInstallmentCalculation {
    constructor(id = null, code = this.generateCode(), user_code = null, loan_code = null, Installment_amount = 0, Interest_amount = 0, Installment_number = 0, payment_date = 0, status = 1, created_by = null, created_at = new Date(), updated_at = new Date(), deleted_at = null){
        this.id = id;
        this.code = code;
        this.user_code = user_code;
        this.loan_code = loan_code;
        this.Installment_amount = Installment_amount;
        this.Interest_amount = Interest_amount;
        this.Installment_number = Installment_number;
        this.payment_date = payment_date;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_by;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(LoanInstallmentCalculation.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }

};