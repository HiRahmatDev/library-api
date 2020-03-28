const connection = require('../config/db');
const bcrypt = require('bcrypt');
const userModel = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `users`', (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  userDetail: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `users` WHERE id = ?', id, (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  },
  insertUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO `users` SET ?', data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } 
        resolve(result);
      });
    });
  },
  loginUser: (dataLogin) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT `email`, `fullname`, `password`, `photo` FROM `users` WHERE `email` = ?', dataLogin.email, (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        if (result.length > 0) {
          bcrypt.compare(dataLogin.password, result[0].password, (err, unhashed) => {
            if (unhashed) {
              resolve(result);
            }
            reject(new Error(err));
          });
        }
      });
    });
  },
  updateUser: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE `users` SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};

module.exports = userModel;