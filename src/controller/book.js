require('dotenv').config();
const bookModel = require('../model/book');
const MiscHelper = require('../helper/helper');
const conn = require('../config/db');
const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS);
const bookController = {
  getBooks: (req, res) => {
    conn.query('SELECT count(*) AS total from `books`', (err, result) => {
      const totalPage = result[0].total;
      const {search, sort, page = 1, limit = 8} = req.query;
      const startPage = (page - 1) * limit;
      const endPage = limit;
      bookModel.getBooks(search, sort, parseInt(startPage), parseInt(endPage))
        .then(result => {
          client.setex('getAllBook', 3600, JSON.stringify(result));
          MiscHelper.paginated(res, result, 200, 'http://localhost:3333/api/v1/book',totalPage, page, startPage, endPage);    
        })
        .catch(err => {
          MiscHelper.response(res, err, 404, 'Book not found!');
        });
    });
  },
  bookDetail: (req, res) => {
    const idBook = req.params.idBook;
    bookModel.bookDetail(idBook)
      .then(result => {
        const resultObj = result[0];
        MiscHelper.response(res, resultObj, 200);
      })
      .catch(err => res.send(err));
  },
  insertBook: (req, res) => {
    const { title, description, author, status = 1, rating = 0, id_category = 1 } = req.body;
    const data = {
      title,
      description,
      author,
      img: `http://localhost:3333/uploads/${req.file.filename}`,
      status,
      rating,
      id_category
    };
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