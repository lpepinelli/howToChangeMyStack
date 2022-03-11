import express from 'express'
import genre from '../controllers/genre-controller'
import book from '../controllers/book-controller'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'public/images' })

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

router.post('/book/image', upload.single('files'), book.postImage)
router.post('/book/getImage', book.getImage)
router.put('/book/image/:previousImage', upload.single('files'), book.putImage)


export default router
