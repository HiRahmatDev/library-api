module.exports = {
  response: (res, result, status, err) => {
    let resultPrint = {};
    if (status == 404) {
      resultPrint.status = 'Not Found!';
      resultPrint.statusCode = status;
      resultPrint.result = null;
      resultPrint.err = err || null;
      return res.status(resultPrint.statusCode).json(resultPrint);
    }
    resultPrint.status = 'Success!';
    resultPrint.statusCode = status;
    resultPrint.result = result;
    resultPrint.err = err || null;
    return res.status(resultPrint.statusCode).json(resultPrint);
  }
};