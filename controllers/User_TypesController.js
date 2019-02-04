var User_TypesRepository = require("../repositories/User_TypesRepository");
var user_typesRepository = new User_TypesRepository();
var User_types = require('../models/User_types');

var user_typesController = {
    index: async (req, res) => {
        var user_types = await user_typesRepository.getUser_Types();

        user_types.forEach(user_types => {
            console.log(user_types.printIDandCode());
        });

        res.json(user_types);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var user_types = await user_typesRepository.getUser_typesByCode(code);
        console.log(user_types.printIDandCode());
        res.send(user_types);
    },

    save: async (req, res) => {
        var data = req.body;

        var user_types = new User_types();
        console.log('Before', user_types);
        user_types.user_type_title = data.user_type_title;
        user_types.user_type_short_code =  data.user_type_short_code;
        user_types.status =  data.status;
        user_types.created_by = data.created_by;
        user_types.created_at =  new Date();
        user_types.updated_at =  new Date();
        user_types.deleted_at = null

        console.log('After', user_types);

        var evt = await user_typesRepository.saveUser_Types(user_types);
        res.status(201);
        res.send();


    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var user_types = await user_typesRepository.getUser_TypesByCode(code);
        console.log(user_types);
        if (user_types) {
            // data exists, update data
            await user_typesRepository.updateUser_TypesByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await user_typesRepository.saveUser_Types(data);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var user_types = await user_typesRepository.updateUser_TypesByCode(data, code);

        res.send(user_types);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = user_typesRepository.deleteUser_Types(code);
        res.send(result);
    }
};

module.exports = user_typesController;