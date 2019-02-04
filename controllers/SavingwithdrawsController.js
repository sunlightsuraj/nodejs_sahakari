var SavingwithdrawRepository = require("../repositories/SavingwithdrawRepository");
var savingwithdrawRepository = new SavingwithdrawRepository();
var Savingwithdraw = require('../models/Savingwithdraw');
var savingwithdrawController = {
    index: async (req, res) => {
        var savingwithdraws = await savingwithdrawRepository.getSavingwithdraws();

        savingwithdraws.forEach(savingwithdraw => {
            console.log(savingwithdraw.printIDandCode());
        });

        res.json(savingwithdraws);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var savingwithdraw = await savingwithdrawRepository.getSavingwithdrawByCode(code);
        console.log(savingwithdraw.printIDandCode());
        res.send(savingwithdraw);
    },

    save: async (req, res) => {
        var data = req.body;
        var savingwithdraw = new Savingwithdraw();
        console.log('Before', savingwithdraw);
        savingwithdraw.code = data.code,
            savingwithdraw.user_code = data.user_code,
            savingwithdraw.balance = data.balance,
            savingwithdraw.withdraw_amount = data.withdraw_amount,
            savingwithdraw.withdraw_date = data.withdraw_date,
            savingwithdraw.status = data.status,
            savingwithdraw.created_by = data.created_by,
            savingwithdraw.created_at = new Date(),
            savingwithdraw.updated_at = new Date()
        console.log('After', savingwithdraw);

        var svgwithdraw = await savingwithdrawRepository.saveSavingwithdraw(savingwithdraw);
        res.status(201);
        res.send();
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
            let savingwithdraw = new Savingwithdraw();
            savingwithdraw = Object.assign(savingwithdraw, data);
            // data doesn't exists, create new data
            await savingwithdrawRepository.saveSavingwithdraw(data);
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