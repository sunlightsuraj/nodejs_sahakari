var SavingwithdrawRepository = require("../repositories/SavingwithdrawRepository");
var savingwithdrawRepository = new SavingwithdrawRepository();

var savingwithdrawController = {
    index: async(req, res) => {
        var savingwithdrawList = await savingwithdrawRepository.getSavingwithdraws();
        console.log('savingwithdraw List: ', savingwithdrawList);
        res.json(savingwithdrawList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var savingwithdraw = await savingwithdrawRepository.getSavingwithdrawByCode(code);
        res.send(savingwithdraw);
    },

    save: async (req, res) => {
        var data = req.body;
        var savingwithdraw_1 = {
            code: data.code,
            user_code: data.user_code,
            balance: data.balance,
            withdraw_amount: data.withdraw_amount,
            withdraw_date: data.withdraw_date,
           status:data.status,
            created_by: data.created_by,
            created_at: new Date(),
            updated_at: new Date()
        };
        var svgwithdraw = await savingwithdrawRepository.saveSavingwithdraw(savingwithdraw_1)
        res.send(svgwithdraw);
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var savingwithdraw = await savingwithdrawRepository.getSavingwithdrawByCode(code);
        console.log(savingwithdraw);
        if (savingwithdraw) {
            // data exists, update data
            await savingwithdrawRepository.updateSavingwithdrawByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await savingwithdrawRepository.savesavingwithdraw(data);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var savingwithdraw = await savingwithdrawRepository.updateSavingwithdrawByCode(data, code);

        res.send(savingwithdraw);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = savingwithdrawRepository.deleteSavingwithdraw(code);
        res.send(result);
    }
};

module.exports = savingwithdrawController;