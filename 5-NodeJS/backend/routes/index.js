const express = require('express')
const router = express.Router()
const genre = require('../controllers/genre-controller')
const book = require('../controllers/book-controller')

router.get('/', function(req, res, next) {
  res.send({'Routes': [{'Books':'/api/Book'}, {'Genres':'/api/Genre'}]})
})

router.get('/genre', genre.getGenres)
router.get('/genre/:id', genre.getGenre)
router.post('/genre', genre.postGenre)
router.put('/genre/:id', genre.putGenre)
router.delete('/genre/:id', genre.deleteGenre)

router.get('/book', book.getBooks)
router.get('/book/:id', book.getBook)
router.post('/book', book.postBook)
router.put('/book/:id', book.putBook)
router.delete('/book/:id', book.deleteBook)


module.exports = router
