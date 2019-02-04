var UserDocumentsRepository = require("../repositories/UserDocumentsRepository");
var userdocumentsRepository = new UserDocumentsRepository();
var UserDocument = require('../models/UserDocument');

var userdocumentsController = {
    index: async (req, res) => {
        var userdocuments = await userdocumentsRepository.getUserDocuments();

        userdocuments.forEach(userdocuments => {
            console.log(userdocuments.printIDandCode());
        });

        res.json(userdocuments);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var userdocuments = await userdocumentsRepository.getUserDocumentByCode(code);
        console.log(userdocuments.printIDandCode());
        res.send(userdocuments);
    },

    save: async (req, res) => {
        var data = req.body;

        var userdocuments = new UserDocument();
        console.log('Before', userdocuments);

        userdocuments.user_code = data.user_code;
        userdocuments.document_type_code = data.document_type_code;
        userdocuments.document_number = data.document_number;
        userdocuments.description = data.description;
        userdocuments.created_by = data.created_by;
        userdocuments.status = data.status;
        userdocuments.created_at = new Date();
        userdocuments.updated_at = new Date()
        userdocuments.deleted_at = null

        console.log('After', userdocuments);
        var userdoc = await userdocumentsRepository.saveUserDocuments(userdocuments);
        res.status(201);
        res.send();

    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var userdocuments = await userdocumentsRepository.getUserDocumentsByCode(code);
        console.log(userdocuments);
        if (userdocuments) {
            // data exists, update data
            await userdocumentsRepository.updateUserDocumentsByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await userdocumentsRepository.saveUserDocuments(data);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var userdocuments = await userdocumentsRepository.updateUserDocumentsByCode(data, code);

        res.send(userdocuments);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = userdocumentsRepository.deleteUserDocuments(code);
        res.send(result);
    }
};

module.exports = userdocumentsController;