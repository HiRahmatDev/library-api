const connection = require('../config/db');
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
      connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};

module.exports = userModel;