const connection = require('../config/db');
const userModel = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `user`', (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};

module.exports = userModel;