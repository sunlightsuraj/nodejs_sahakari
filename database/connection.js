var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahuri_sahakari'
});

connection.connect();

module.exports = connection;