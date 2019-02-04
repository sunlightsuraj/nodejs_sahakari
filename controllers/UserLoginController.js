var UserLoginRepository = require('../repositories/UserLoginRepository');
var userloginRepository = new UserLoginRepository();
var UserLogin = require('../models/UserLogin');

var userloginController = {
    index:  async (req, res) => {
        var userloginlist = await userloginRepository.getUserLogins();

        userloginlist.forEach(userloginlist => {
             console.log(userloginlist.printIDandCode());
        });
      
        res.json(userloginlist);
    },

    show: async(req,res)=>{
        var code = req.params.code;
        var userlog = await userloginRepository.getUserLoginByCode(code);
        console.log(userlog.printIDandCode());
        res.send(userlog);
    },

    save: async (req, res) => {
        var data = req.body;
        var userlogin = new UserLogin();
        console.log('Before', userlogin);
       
        userlogin.user_code = data.user_code;
        userlogin.username = data.username;
        userlogin.password = data.password;
        userlogin.status = data.status;
        userlogin.created_by = data.created_by;
        userlogin.created_at = data.created_at;
        userlogin.updated_at = data.updated_at;
        userlogin.deleted_at = data.deleted_at;
        
        console.log('After', userlogin);

        var usl = await userloginRepository.saveUserLogin(userlogin);
        res.send(userlogin);
    },

    updateOrInsert: async (req, res) => {
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

    },

    insert: async(req,res) =>{
        var code = req.params.code;
        var data = req.body;
        var userlogin = await userloginRepository.updateUserLoginByCode(data, code);
      
        res.send(userlogin);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = await userloginRepository.deleteUserLogin(code);
        res.status(200).json();
    },
      
};

module.exports = userloginController;