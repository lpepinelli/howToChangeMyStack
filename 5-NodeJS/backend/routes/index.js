const express = require('express')
const router = express.Router()
const genre = require('../controllers/genre-controller')

router.get('/', function(req, res, next) {
  res.send({'Routes': [{'Books':'/api/Book'}, {'Genres':'/api/Genre'}]})
})

router.get('/genre', genre.getGenres)
router.get('/genre/:id', genre.getGenre)
router.post('/genre', genre.postGenre)


module.exports = router
