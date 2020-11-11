var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'backend-db',
    user: 'app',
    password: '123456',
    database: 'agenda-petshop'
});

module.exports = connection;