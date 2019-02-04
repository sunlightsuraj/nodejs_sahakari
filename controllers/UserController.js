var UserRepository = require('../repositories/UserRepository');
var userRepository = new UserRepository();
var User = require('../models/User');

var userController = {
    index: async (req, res)=> {
        var userlist = await userRepository.getusers();

        userlist.forEach(userlist => {
            console.log(userlist.printIDandCode());
        });
        
        res.json(userlist);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var user = await userRepository.getUserByCode(code);
        console.log(user.printIDandCode());
        res.send(user);
    },

    save: async (req, res) => {
        var data = req.body;

        var user = new User();
        console.log('Before', user);
        user.user_type_code = data.user_type_code,
        user.first_name = data.first_name,
        user.middle_name = data.middle_name,
        user.last_name = data.last_name,
        user.permanent_address = data.permanent_address,
        user.current_address = data.current_address,
        user.phone = data.phone,
        user.email = data.email,
        user.date_of_birth = data.date_of_birth,
        user.occupation = data.occupation,
        user.gender = data.gender,
        user.business = data.buisness,
        user.father_name = data.father_name,
        user.grand_father_name = data.grand_father_name,
        user.nominee_code = data.nominee_code,
        user.verified_date = data.verified_date,
        user.verified_by = data.verified_date,
        user.can_login = data.can_login,
        user.status = data.status,
        user.created_by = data.created_by,
        
        console.log('After', user);

        
        var use = await userRepository.saveUser(user);
        res.status(201);
        res.send();
    },

    updateOrInsert: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var user = await userRepository.getUserByCode(code);
        console.log(user);
        if (user) {
          await userRepository.updateUserByCode(data,code);
      
        }

        else {
           await userRepository.saveuser(data);
        }
        res.send(200).json();
    },

    update: async(req,res) =>{
        var code = req.params.code;
        var data = req.body;
        var event = await userRepository.updateUserByCode(data, code);
      
        res.send(event);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = userRepository.deleteUser(code);
        res.send(result);
    },

};

module.exports = userController;