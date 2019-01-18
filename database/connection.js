var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'mahuri_db_user',
    password: 'M@huR132!',
    database: 'mahuri_sahakari'
});

connection.connect();

module.exports = connection;