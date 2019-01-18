var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond from user logins');
});

router.get('/test', (req, res) => {
    res.send('response from test ');
});

module.exports = router;
