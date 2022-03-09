const express = require('express')
const router = express.Router()
const genre = require('../controllers/genre-controller')

router.get('/genre', genre.getGenres)
router.get('/genre/:id', genre.getGenre)
router.post('/genre', genre.postGenre)
router.put('/genre/:id', genre.putGenre)
router.delete('/genre/:id', genre.deleteGenre)

module.exports = router
