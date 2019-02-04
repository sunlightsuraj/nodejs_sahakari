var Document_TypesRepository = require("../repositories/Document_TypesRepository");
var document_typesRepository = new Document_TypesRepository();
var Document_types = require('../models/Document_types');

var document_typesController = {
    index: async(req, res) => {
        var document_types = await document_typesRepository.getDocument_Types();
        
        document_types.forEach(document_type => {
            console.log(document_type.printIDandCode());
        });

        res.json(document_types);
    },

    show: async (req, res) => {
        var code = req.params.code;
    var document_types = await document_typesRepository.getDocument_TypesByCode(code);
    console.log(document_types.printIDandCode());
    res.send(document_types);
    },

    save: async (req, res) => {
        var data = req.body;

        var document_types = new Document_types();
        console.log('Before', document_types);
        document_types.document_type = data.document_type;
        document_types.description =  data.description;
        document_types.status =  data.status;
        document_types.created_by = data.created_by;
        document_types.created_at =  new Date();
        document_types.updated_at =  new Date();
        document_types.deleted_at = null

        console.log('After', document_types);

        var evt = await document_typesRepository.saveDocument_Types(document_types);
        res.status(201);
        res.send();

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

        res.send(document_types);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = document_typesRepository.deleteDocument_Types(code);
        res.send(result);
    }
};

module.exports = document_typesController;