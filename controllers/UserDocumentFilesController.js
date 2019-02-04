var UserDocumentFilesRepository = require("../repositories/UserDocumentFilesRepository");
var userdocumentfilesRepository = new UserDocumentFilesRepository();
var UserDocumentFile = require('../models/UserDocumentFile');

var userdocumentfilesController = {
    index: async (req, res) => {
        var userdocumentfiles = await userdocumentfilesRepository.getUserDocumentFiles();

        userdocumentfiles.forEach(userdocumentfiles => {
            console.log(userdocumentfiles.printIDandCode());
        });

        res.json(userdocumentfiles);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var userdocumentfiles = await userdocumentfilesRepository.getUserDocumentFileByCode(code);
        console.log(userdocumentfiles.printIDandCode());
        res.send(userdocumentfiles);
    },

    save: async (req, res) => {
        var data = req.body;

        var userdocumentfiles = new UserDocumentFile();
        console.log('Before', userdocumentfiles);

        userdocumentfiles.user_code = data.user_code;
        userdocumentfiles.user_document_code = data.user_document_code;
        userdocumentfiles.document_file = data.document_file;
        userdocumentfiles.document_file_type = data.document_file_type;
        userdocumentfiles.description = data.description;
        userdocumentfiles.created_by = data.created_by;
        userdocumentfiles.status = data.status;
        userdocumentfiles.created_at = new Date();
        userdocumentfiles.updated_at = new Date();
        userdocumentfiles.deleted_at = null;

        console.log('After', userdocumentfiles);
        var userdoc = await userdocumentfilesRepository.saveUserDocumentFiles(userdocumentfiles);
        res.status(201);
        res.send();

    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var userdocumentfiles = await userdocumentfilesRepository.getUserDocumentFilesByCode(code);
        console.log(userdocumentfiles);
        if (userdocumentfiles) {
            // data exists, update data
            await userdocumentfilesRepository.updateUserDocumentFilesByCode(data, code);
        } else {
            // data doesn't exists, create new data
            await userdocumentfilesRepository.saveUserDocumentFiles(data);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var userdocumentfiles = await userdocumentfilesRepository.updateUserDocumentFilesByCode(data, code);

        res.send(userdocumentfiles);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = userdocumentfilesRepository.deleteUserDocumentFiles(code);
        res.send(result);
    }
};

module.exports = userdocumentfilesController;