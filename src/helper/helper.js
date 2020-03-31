// const bcrypt = require('bcrypt');
module.exports = {
  response: (res, result, status, err) => {
    let resultPrint = {};
    if (status != 200) {
      resultPrint.status = 'Failed';
      resultPrint.statusCode = status;
      resultPrint.result = result;
      resultPrint.err = err || null;
      return res.status(resultPrint.statusCode).json(resultPrint);
    }
    resultPrint.status = 'Success!';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || null;
    return res.status(resultPrint.statusCode).json(resultPrint);
  },
  paginated: (result, route, page, start, end) => {
    result.unshift({
      total: result.length
    });
    result[0].next_link = null;
    result[0].prev_link = null;
    if (end < result.length) {
      result[0].next_link = route + '?page=' + parseInt(parseInt(page) + 1);
    }
    if (start > 0) {
      result[0].prev_link = route + '?page=' + parseInt(parseInt(page) - 1);
    }
  }
};