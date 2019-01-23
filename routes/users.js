var express = require('express');
var router = express.Router();
var UserRepository = require('../repositories/userRepository');
var userRepository = new UserRepository();

/* GET users listing. */
router.get('/', async (req, res)=> {
  var userlist = await userRepository.getusers();

  console.log('User List :', userlist);
  res.json(userlist);
});
router.get('/:code', async (req, res) => {
  var code = req.params.code;
  var user = await userRepository.getUserByCode(code);
  res.send(user);
});
router.post('/', async (req, res) => {
  var data = req.body;
  var user_1 = {
    code: data.code,
    user_type_code: data.user_type_code,
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    permanent_address: data.permanent_address,
    current_address: data.current_address,
    phone: data.phone,
    email: data.email,
    date_of_birth: data.date_of_birth,
    occupation: data.occupation,
    gender: data.gender,
    business: data.buisness,
    father_name: data.father_name,
    grand_father_name: data.grand_father_name,
    nominee_code: data.nominee_code,
    verified_date: data.verified_date,
    verified_by: data.verified_date,
    can_login: data.can_login,
    status: data.status,
    created_by: data.created_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
  var use = await userRepository.saveUser(user_1);
  res.send(use);
});
router.put('/:code', async (req, res) => {
  var code = req.params.code;
  var data = req.body;
  var user = await userRepository.getUserByCode(code);
  console.log(user);
  if (user) {
    await userRepository.updateUserByCode(data,code);

  } else {
     await userRepository.saveuser(data);
    }
  res.send(200).json();
});

router.patch('/:code', async(req,res) =>{
  var code = req.params.code;
  var data = req.body;
  var event = await userRepository.updateUserByCode(data, code);

  res.send(event);
});

router.delete('/:code', async (req, res) => {
  var code = req.params.code;
  var result = userRepository.deleteUser(code);
  res.send(result);
});
module.exports = router;
