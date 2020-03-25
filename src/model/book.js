const connection = require('../config/db');
const modulBook = {
  getBooks: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `books`', (err, result) => {
        if(err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  bookDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `books` WHERE id = ?', id, (err, result) => {
        if(err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `books` SET ?', data, (err, result) => {
        if(err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  updateBook: (data, idBook) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `books` SET ? WHERE id = ?', [data, idBook], (err, result) => {
        if(err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM `books` WHERE id = ?', id, (err, result) => {
        if(err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};

module.exports = modulBook;