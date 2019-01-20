var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahuri_sahakari',
    port: '3306'
});

connection.connect();

module.exports = connection;