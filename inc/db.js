const mysql = require('mysql2');

//criar conexao com bd
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'flashcardapp',
    password: 'password'
  });

module.exports = connection;