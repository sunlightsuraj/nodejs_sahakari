var User_TypesRepository = require("../repositories/User_TypesRepository");
var user_typesRepository = new User_TypesRepository();

var user_typesController = {
    index: async(req, res) => {
        var user_typesList = await user_typesRepository.getUser_Types();
        console.log('User_Types List: ', user_typesList);
        res.json(user_typesList);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var user_types = await user_typesRepository.getUser_TypesByCode(code);
        res.send(event);
    },

    save: async (req, res) => {
        var data = req.body;
        var user_types_1 = {
            code: data.code,
            user_type_title: data.user_type_title,
            user_type_short_code: data.user_type_short_code,
            status: data.status,
            created_by: data.created_by,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        };
        var evt = await user_typesRepository.saveUser_Types(user_types_1);
        res.send(user_types_1);
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