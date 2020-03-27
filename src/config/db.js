// Koneksi database
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: '',
  database: 'library'
});

connection.connect((err) => {
  if(err) console.log('db.js dalam config ada yang error bang: ' + err);
});

module.exports = connection;