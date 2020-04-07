const connection = require('../config/db');
module.exports = {
  getCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category', (err, result) => {
        if (err) {
          reject(new Error(err));
        }
        resolve(result);
      });
    });
  }
};