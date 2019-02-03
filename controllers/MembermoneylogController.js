var MembermoneylogRepository = require("../repositories/MembermoneylogRepository");
var membermoneylogRepository = new MembermoneylogRepository();

var membermoneylogController = {
    index: async(req, res) => {
        var membermoneylog = await membermoneylogRepository.getMembermoneylogs();
        membermoneylog.forEach(membermoneylog => {
            console.log(membermoneylog.printIDandCode());
        });

        res.json(membermoneylog);
    },

    show: async (req, res) => {
        var code = req.params.code;
        var membermoneylog = await membermoneylogRepository.getMembermoneylogByCode(code);
        console.log(membermoneylog.printIDandCode());
        res.send(membermoneylog);
    },

    save: async (req, res) => {
        var data = req.body;
        var membermoneylog = new Membermoneylog();
        console.log('Before', membermoneylog);
            membermoneylog.code = data.code,
            membermoneylog.user_code = data.user_code,
            membermoneylog.balance = data.balance,
            membermoneylog.balance_date = data.balance_date,
            membermoneylog.tran_type = data.tran_type,
            membermoneylog.tran_code = data.tran_code,
           membermoneylog.status =data.status,
            membermoneylog.created_by = data.created_by,
            membermoneylog.created_at = new Date(),
            membermoneylog.updated_at = new Date()
            
    
        console.log('After', membermoneylog);
        var mml = await membermoneylogRepository.saveMembermoneylog(membermoneylog);
        res.status(201);
        res.send();
    },

    updateOrInsert: async (req, res) => {
        var data = req.body;
        var code = data.code;

        var membermoneylog = await membermoneylogRepository.getMembermoneylogByCode(code);
        console.log(membermoneylog);
        if (membermoneylog) {
            // data exists, update data
            await membermoneylogRepository.updateMembermoneylogByCode(data, code);
        } else {
            let membermoneylog = new Membermoneylog();
            membermoneylog = Object.assign(membermoneylog, data);
            // data doesn't exists, create new data
            await membermoneylogRepository.saveMembermoneylog(data);
        }

        res.status(200).json();
    },

    update: async (req, res) => {
        var code = req.params.code;
        var data = req.body;
        var membermoneylog = await membermoneylogRepository.updateMembermoneylogByCode(data, code);

        res.send(membermoneylog);
    },

    delete: async (req, res) => {
        var code = req.params.code;
        var result = membermoneylogRepository.deleteMembermoneylog(code);
        res.send(result);
    }
};

module.exports = membermoneylogController;