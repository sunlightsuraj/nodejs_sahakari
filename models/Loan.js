var crypto = require('crypto');

module.exports = class Loan {

    constructor(id = null, code = this.generateCode(),user_code = null, loan_amount = 0, maturity_date = 0, request_date = 0, issue_date = 0, approve_date = 0, interest_rate = 0, approved_by = null, installment_days = 0, remarks = null, status = 1, created_by = null,
    created_at  = new Date(), updated_at = new Date(), deleted_at = null){

        this.id = id;    
        this.code = code;
        this.user_code = user_code;
        this.loan_amount = loan_amount;
        this.maturity_date = maturity_date;
        this.request_date = request_date;
        this.issue_date = issue_date;
        this.approve_date = approve_date;
        this.interest_rate = interest_rate;
        this.approved_by = approved_by;
        this.installment_days = installment_days;
        this.remarks = remarks;
        this.status = status;
        this.created_by = created_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    generateCode() {
        let rand = Math.floor(Math.random() * 1011010101010101010000);
        return crypto.createHash('md5').update(Loan.name + rand.toString() + ((new Date()).toString())).digest('hex');
    }

    printIDandCode() {
        console.log('Id: ' + this.id + '\nCode: ' + this.code);
    }

};