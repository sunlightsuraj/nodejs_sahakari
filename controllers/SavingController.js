var SavingRepository = require("../repositories/SavingRepository");
var savingRepository = new SavingRepository();
var Saving = require('../models/Saving');

var savingController = {
    index: async (req, res) => {
        var savings = await savingRepository.getSavings();

        savings.forEach(saving => {
            console.log(saving.printIDandCode());
        });

        res.json(savings);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var saving = await savingRepository.getSavingByCode(code);
        console.log(saving.printIDandCode());
        res.send(saving);
    },

    save: async (req, res) => {
        var data = req.body;

        var saving = new Saving();
        console.log('Before', saving);
        saving.saving_amount = data.saving_amount;
        saving.collected_date = data.collected_date;
        saving.collected_for_date = data.collected_for_date;
        saving.user_code = data.user_code;
        saving.collected_by = data.collected_by;
        saving.ref_code = data.ref_code;
        saving.verified_by = data.verified_by;
        saving.status = data.status;
        saving.created_by = data.created_by;

        console.log('After', saving);

        var svg = await savingRepository.saveSaving(saving);
        res.status(201);
        res.send();
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var saving = await savingRepository.getSavingByCode(code);
        console.log(saving);
        if (saving) {
            // data exists, update data
            await savingRepository.updateSavingByCode(data, code);
        } else {
            let saving = new Saving();
            saving = Object.assign(saving, data);
            // data doesn't exists, create new data
            await savingRepository.saveSaving(data);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var saving = await savingRepository.updateSavingByCode(data, code);

        res.send(saving);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = savingRepository.deleteSaving(code);
        res.send(result);
    }
};

module.exports = savingController;