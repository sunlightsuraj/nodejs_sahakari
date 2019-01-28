var Document_TypesRepository = require("../repositories/Document_TypesRepository");
var document_typesRepository = new Document_TypesRepository();

var document_typesController = {
    index: async(req, res) => {
        var document_typesList = await document_typesRepository.getDocument_Types();
        console.log('Document_Types List: ', document_typesList);
        res.json(document_typesList);
    },

    show: async (req, res) => {
        var code = req.params.code;
    var document_types = await document_typesRepository.getDocument_TypesByCode(code);
    res.send(document_types);
    },

    save: async (req, res) => {
        var data = req.body;
        var document_types_1 = {
            code: data.code,
            document_type: data.document_type,
            description: data.description,
            status: data.status,
            created_by: data.created_by,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        };
        var evt= await document_typesRepository.saveDocument_Types(document_types_1);
        res.send(document_types_1);
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var document_types = await document_typesRepository.getDocument_TypesByCode(code);
        console.log(document_types);
        if (document_types) {
            // data exists, update data
            await document_typesRepository.updateDocument_TypesByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await document_typesRepository.saveDocument_Types(data);
        }
    
        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var document_types = await document_typesRepository.updateDocument_TypesByCode(data, code);

        res.send(user_types);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = document_typesRepository.deleteDocument_Types(code);
        res.send(result);
    }
};

module.exports = document_typesController;