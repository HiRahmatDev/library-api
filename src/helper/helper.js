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
  paginated: (res, result, status, url, total, page, start, limit, err) => {
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
    resultPaginated.page = parseInt(page);
    resultPaginated.totalPage = Math.ceil(total / limit);
    resultPaginated.totalFound = result.length;
    resultPaginated.totalBook = total;
    if (page < Math.ceil(total / limit)) {
      resultPaginated.nextLink = url + '?page=' + parseInt(parseInt(page) + 1) + '&limit=' + limit;
    } else {
      resultPaginated.nextLink = null;
    }
    if (start > 0) {
      resultPaginated.prevLink = url + '?page=' + parseInt(parseInt(page) - 1) + '&limit=' + limit;
    } else {
      resultPaginated.prevLink = null;
    }
    resultPaginated.result = result;
    resultPaginated.err = err || '';
    return res.status(resultPaginated.statusCode).json(resultPaginated);
  }
};