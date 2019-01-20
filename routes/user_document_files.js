var express = require('express');
var router = express.Router();
var UserDocumentFilesRepository = require("../Repositories/UserDocumentFilesRepository.js");
var userdocumentfilesRepository = new UserDocumentFilesRepository();
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a user_document_files');
});
*/
router.get('/', async(req,res)=>{
  var results = await userdocumentfilesRepository.getuserdocumentfiles();
  console.log(results);
  res.json(results);
});
router.get('/:code', async (req,res)=>{
  var code = req.params.code
  var userdocumentfiles = await userdocumentfilesRepository.getUserDocumentFilesByCode(code);
  res.send(userdocumentfiles);
});
router.put('/', async(req,res)=>{
  var data = req.body;
  var code = data.code;
  var userdoc = await userdocumentfilesRepository.getUserDocumentFilesByCode(code);
  if(userdoc){
    //data exists
    await userdocumentfilesRepository.updateUserDocumentByCode(data,code);
  }else{
    //data doesn't exists
    await userdocumentfilesRepository.saveUserDocumentFilesRepository(data);
  }
  res.status(200).json();
});
router.post('/',async(req,res)=>{
  var data = req.body;
  var userdocumentfiles ={
    code : data.code,
    user_code : data.user_code,
    user_document_code : data.user_document_code,
    document_file : data.document_file,
    document_file_type : data.document_file_type,
    description : data.description,
    created_by : data.created_by,
    status : data.status,
    created_at : new Date(),
    updated_at : new Date()
  }
  var userdoc = await userdocumentfilesRepository.saveUserDocumentFilesRepository(userdocumentfiles);
  res.send(userdoc);
});

router.patch('/:code', async(req,res)=>{
  var code = req.params.code;
  var data = req.body;
  var userdoc = await userdocumentfilesRepository.updateUserDocumentByCode(data,code);
});

router.delete('/:code', async(req,res)=>{
  var code = req.params.code;
  var userdoc = await userdocumentfilesRepository.deleteUserDocumentFilesByCode(code);
  res.status(200).json();
});

module.exports = router;
