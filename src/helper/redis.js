require('dotenv').config();

const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS);

module.exports = {
  cacheGetAllBook: (req, res, next) => {
    client.get('getAllBook', (err, result) => {
      if (err) throw err;
      if (result !== null) {
        res.send(JSON.parse(result));
      } else {
        next();
      }
    });
  },
  clearGetAllBook: (req, res, next) => {
    client.del('getAllBook');
    next();
  }
};