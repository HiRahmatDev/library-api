const connection = require('../config/db');
const bookModel = {
  getBooks: (search) => {
    return new Promise((resolve, reject) => {
      if (search) {
        connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` WHERE lower(`books`.`title`) LIKE ? OR lower(`books`.`description`) LIKE ?', [`%${search}%`, `%${search}%`], (err, result) => {
          if(err) {
            reject(new Error(err));
          }
          resolve(result);
        });
      }
      connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id`', (err, result) => {
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
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  updateBook: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `books` SET ? WHERE id = ?', [data, id], (err, result) => {
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

module.exports = bookModel;