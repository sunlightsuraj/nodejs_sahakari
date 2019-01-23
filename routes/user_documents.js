var express = require('express');
var router = express.Router();
var UserDocumentsRepository = require('../repositories/UserDocumentsRepository.js');
var userdocumentsRepository = new UserDocumentsRepository();

/* GET users listing. */
router.get('/', async (req, res) => {
  var userdocumentList = await userdocumentsRepository.getuserdocuments();
  console.log('User Documents List', userdocumentList);
  res.json(userdocumentList);
});

router.post('/', async (req, res) => {
  var data = req.body;
  var userdocuments = {
    code: data.code,
    user_code: data.user_code,
    document_type_code: data.document_type_code,
    document_number: data.document_number,
    description: data.description,
    created_by: data.created_by,
    status: data.status,
    created_at: new Date(),
    updated_at: new Date()
  }
  var userdoc = await userdocumentsRepository.saveUserDocuments(userdocuments);
  res.send(userdoc);
});

router.get('/:code', async (req, res) => {
  var code = req.params.code;
  var userdocuments = await userdocumentsRepository.getUserDocumentsByCode(code);
  console.log(userdocuments);
  res.send(userdocuments);
})

router.put('/', async (req, res) => {
  var data = req.body;
  var code = data.code;
  var userdoc = await userdocumentsRepository.getUserDocumentsByCode(code);
  if (userdoc) {
    //data exists
    await userdocumentsRepository.updateUserDocumentsByCode(data, code);
  } else {
    await userdocumentsRepository.saveUserDocuments(data);
    //data doesn't exist
  }
  res.status(200).json();
})
router.delete('/:code', async (req, res) => {
  var code = req.params.code;
  var userdoc = await userdocumentsRepository.deleteUserDocumentsByCode(code);
  res.status(200).send();
})
module.exports = router;