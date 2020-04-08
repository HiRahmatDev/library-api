require('dotenv').config();

const MiscHelper = require('./helper');
const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS);

module.exports = {
  cacheGetAllBook: (req, res, next) => {
    client.get('getAllBook', (err, result) => {
      if (err) throw err;
      if (result !== null) {
        MiscHelper.paginated(res, JSON.parse(result), 200);
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