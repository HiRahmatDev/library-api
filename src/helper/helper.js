// const bcrypt = require('bcrypt');
module.exports = {
  response: (res, result, status, err) => {
    let resultPrint = {};
    if (status != 200) {
      resultPrint.status = 'Failed';
      resultPrint.statusCode = status;
      resultPrint.result = result;
      resultPrint.err = err || '';
      return res.status(resultPrint.statusCode).json(resultPrint);
    }
    resultPrint.status = 'Success!';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || '';
    return res.status(resultPrint.statusCode).json(resultPrint);
  },
  paginated: (res, result, status, route, page, start, end, err) => {
    let resultPaginated = {};
    if (status != 200) {
      resultPaginated.status = 'Failed';
      resultPaginated.statusCode = status;
      resultPaginated.result = result;
      resultPaginated.err = err || '';
      return res.status(resultPaginated.statusCode).json(resultPaginated);
    }
    resultPaginated.status = 'Success!';
    resultPaginated.statusCode = status;
    resultPaginated.totalFound = result.length;
    resultPaginated.nextLink = '';
    if (end <= result.length) {
      if (end == 6) {
        resultPaginated.nextLink = route + '?page=' + parseInt(parseInt(page) + 1);
      }
      resultPaginated.nextLink = route + '?page=' + parseInt(parseInt(page) + 1) + '&limit=' + end;
    }
    resultPaginated.prevLink = '';
    if (start > 0) {
      if (end == 6) {
        resultPaginated.prevLink = route + '?page=' + parseInt(parseInt(page) - 1);
      }
      resultPaginated.prevLink = route + '?page=' + parseInt(parseInt(page) - 1) + '&limit=' + end;
    }
    resultPaginated.result = result;
    resultPaginated.err = err || '';
    return res.status(resultPaginated.statusCode).json(resultPaginated);
  }
};