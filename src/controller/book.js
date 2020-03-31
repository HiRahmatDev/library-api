const bookModel = require('../model/book');
const MiscHelper = require('../helper/helper');
const bookController = {
  getBooks: (req, res) => {
    const {search, sort, page = 1, limit = 3} = req.query;
    const startPage = (page - 1) * limit;
    const endPage = limit;
    bookModel.getBooks(search, sort, parseInt(startPage), parseInt(endPage))
      .then(result => {
        MiscHelper.paginated(result, 'http://localhost:8000/api/v1/book', page, startPage, endPage);    
        MiscHelper.response(res, result, 200);
      })
      .catch(err => {
        MiscHelper.response(res, err, 404, 'Book not found!');
      });
  },
  bookDetail: (req, res) => {
    const idBook = req.params.idBook;
    bookModel.bookDetail(idBook)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => res.send(err));
  },
  insertBook: (req, res) => {
    const { title, description, author, img, status, id_category } = req.body;
    const data = { title, description, author, img, status, id_category };
    bookModel.insertBook(data)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  updateBook: (req, res) => {
    const idBook = req.params.idBook;
    const { title, description, author, img, status, id_category } = req.body;
    const data = { title, description, author, img, status, id_category };
    bookModel.updateBook(data, idBook)
      .then(result => res.send(result))
      .catch(err => res.send(err));
  },
  deleteBook: (req, res) => {
    const idBook = req.params.idBook;
    bookModel.deleteBook(idBook)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  },
  loanBook: (req, res) => {
    const {user, book} = req.query;
    const dataLoan = {
      id_user: user,
      id_book: book,
      forfeit: 0
    };
    bookModel.loanBook(dataLoan)
      .then(result => {
        res.send(result);
      })
      .catch(err => res.send(err));
  },
  loanList: (req, res) => {
    bookModel.loanList()
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => res.send(err));
  }
};

module.exports = bookController;