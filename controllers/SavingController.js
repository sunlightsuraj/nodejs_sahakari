var SavingRepository = require("../repositories/SavingRepository");
var savingRepository = new SavingRepository();

var savingController = {
    index: async(req, res) => {
        var savingList = await savingRepository.getSavings();
        console.log('saving List: ', savingList);
        res.json(savingList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var saving = await savingRepository.getSavingByCode(code);
        res.send(saving);
    },

    save: async (req, res) => {
        var data = req.body;
        var saving_1 = {
            code: data.code,
            saving_amount: data.saving_amount,
            collected_date: data.collected_date,
            collected_for_date: data.collected_for_date,
            user_code: data.user_code,
            collected_by: data.collected_by,
           ref_code: data.ref_code,
           verified_by:data.verified_by,
           status:data.status,
            created_by: data.created_by,
            created_at: new Date(),
            updated_at: new Date()
        };
        var svg = await savingRepository.saveSaving(saving_1);
        res.send(saving_1);
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