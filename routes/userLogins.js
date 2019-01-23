var express = require('express');
var router = express.Router();
var userLoginRepository = require('../repositories/UserLoginRepository');
var userloginRepository = new userLoginRepository();
/* GET users listing. */
router.get('/', async (req, res) => {
  var userloginlist = await userloginRepository.getUserLogins();
 console.log('User Login List :', userloginlist);
  res.json(userloginlist);
});
router.get('/:code', async(req,res)=>{
  var code = req.params.code;
  var userlog = await userloginRepository.getUserLoginByCode(code);
  res.send(userlog);
})
router.post('/', async (req, res) => {
  var data = req.body;
  var userlogin_1 = {
    code: data.code,
    user_code: data.user_code,
    username: data.username,
    password: data.password,
    status: data.status,
    created_by: data.created_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
    deleted_at:data.deleted_at,
  };
  var usl = await userloginRepository.saveUserLogin(userlogin_1);
  res.send(userlogin_1);
});
router.put('/:code', async (req, res) => {
  var code = req.params.code;
  var data = req.body;
  var userlogin = await userloginRepository.getUserLoginByCode(code);
  console.log(userlogin);
  if (userlogin) {
    await userloginRepository.updateUserLoginByCode(data,code);

  } else {
     await userloginRepository.saveUserLogin(data);
    }
  res.status(200).json();
});

router.patch('/:code', async(req,res) =>{
  var code = req.params.code;
  var data = req.body;
  var userlogin = await userloginRepository.updateUserLoginByCode(data, code);

  res.send(userlogin);
});

router.delete('/:code', async (req, res) => {
  var code = req.params.code;
  var result = await userloginRepository.deleteUserLogin(code);
  res.status(200).json();
});
module.exports = router;
