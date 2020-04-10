// Koneksi database
require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host    : process.env.DB_HOST,
  user    : process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if(err) console.log('db.js dalam config ada yang error bang: ' + err);
});

module.exports = connection;