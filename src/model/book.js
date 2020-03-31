const connection = require('../config/db');
const bookModel = {
  getBooks: (search, sort = 'id', page, limit) => {
    return new Promise((resolve, reject) => {
      if (search) {
        if (sort) {
          connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` WHERE lower(`books`.`title`) LIKE ? OR lower(`books`.`description`) OR lower(`books`.`author`) LIKE ? ORDER BY `books`.`' + sort + '', [`%${search}%`, `%${search}%`], (err, result) => {
            if(err) {
              reject(new Error(err));
            }
            resolve(result);
          });
        }
        connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` WHERE lower(`books`.`title`) LIKE ? OR lower(`books`.`description`) OR lower(`books`.`author`) LIKE ?', [`%${search}%`, `%${search}%`], (err, result) => {
          if(err) {
            reject(new Error(err));
          }
          resolve(result);
        });
      }
      if (sort) {
        if (page || limit) {
          connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` ORDER BY `books`.`' + sort + '` LIMIT ' + page + ',' + limit + '', (err, result) => {
            if(err || result.length < 1) {
              reject(new Error(err));
            }
            resolve(result);
          });
        }
        connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` ORDER BY `books`.`' + sort + '` LIMIT ' + page + ',' + limit + '', (err, result) => {
          if(err) {
            reject(new Error(err));
          }
          resolve(result);
        });
      }
    });
  },
  bookDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` WHERE `books`.`id` = ?', id, (err, result) => {
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
  },
  loanBook: (dataLoan) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `loan` SET ?', dataLoan, (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  loanList: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT `loan`.`id`, `users`.`email`, `users`.`fullname`, `books`.`title`, `loan`.`forfeit` FROM `loan` JOIN `users` ON `loan`.`id_user` = `users`.`id` JOIN `books` ON `loan`.`id_book` = `books`.`id`', (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};

module.exports = bookModel;