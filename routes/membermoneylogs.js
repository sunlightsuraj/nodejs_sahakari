var express = require('express');
var router = express.Router();
var MembermoneylogRepository = require("../repositories/MembermoneylogRepository");
var membermoneylogRepository = new MembermoneylogRepository();

router.get('/', async (req, res) => {
    var membermoneylogList = await membermoneylogRepository.getMembermoneylogs();
    console.log('membermoneylog List: ', membermoneylogList);
    res.json(membermoneylogList);
});

router.get('/:code', async (req, res) => {
    var code = req.params.code;
    var membermoneylog = await membermoneylogRepository.getMembermoneylogByCode(code);
    res.send(membermoneylog);
});

router.post('/', async (req, res) => {
    var data = req.body;
    var membermoneylog_1 = {
        code: data.code,
        user_code: data.user_code,
        balance: data.balance,
        balance_date: data.balance_date,
        tran_type: data.tran_type,
        tran_code: data.ctran_code,
       status:data.status,
        created_by: data.created_by,
        created_at: new Date(),
        updated_at: new Date()
    };
    var mml = await membermoneylogRepository.saveMembermoneylog(membermoneylog_1)
    res.send(mml);
});

router.put('/', async (req, res) => {
    var data = req.body;
    var code = data.code;

    var membermoneylog = await membermoneylogRepository.getMembermoneylogByCode(code);
    console.log(membermoneylog);
    if (membermoneylog) {
        // data exists, update data
        await membermoneylogRepository.updateMembermoneylogByCode(data, code);
    } else {
        // data doesn't exists, create new data
        await membermoneylogRepository.saveMembermoneylog(data);
    }

    res.status(200).json();
});

router.patch('/:code', async (req, res) => {
    var code = req.params.code;
    var data = req.body;
    var membermoneylog = await membermoneylogRepository.updateMembermoneylogByCode(data, code);

    res.send(membermoneylog);
});

router.delete('/:code', async (req, res) => {
    var code = req.params.code;
    var result = membermoneylogRepository.deleteMembermoneylog(code);
    res.send(result);
});

module.exports = router;