const connection = require('../config/db');
const bookModel = {
  getBooks: (search, sort = 'id', page = 1, limit = 3) => {
    const startPage = (page - 1) * limit;
    const endPage = limit;
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
          connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` ORDER BY `books`.`' + sort + '` LIMIT ' + startPage + ',' + endPage + '', (err, result) => {
            if(err) {
              reject(new Error(err));
            }
            resolve(result);
          });
        }
        connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` ORDER BY `books`.`' + sort + '` LIMIT ' + startPage + ',' + endPage + '', (err, result) => {
          if(err) {
            reject(new Error(err));
          }
          resolve(result);
        });
      }
      if (page || limit) {
        connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` ORDER BY `books`.`' + sort + '` LIMIT ' + startPage + ',' + endPage + '', (err, result) => {
          if(err) {
            reject(new Error(err));
          }
          resolve(result);
        });
      }
      connection.query('SELECT `books`.*, `category`.`name_category` FROM `books` JOIN `category` ON `books`.`id_category` = `category`.`id` ORDER BY `books`.`' + sort + '` LIMIT ' + startPage + ',' + endPage + '', (err, result) => {
        if(err) {
          reject(new Error(err));
        }
        resolve(result);
      });
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
  loanBook: () => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT * FROM `loan`', (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};

module.exports = bookModel;