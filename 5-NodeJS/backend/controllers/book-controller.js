const bookService = require('../services/book-service')
const imageService = require('../services/image-service')

const getBooks = async (req, res, next) => {
    try {
        const result = await bookService.listBooks()
        res.status(200).send(result);
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const getBook = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await bookService.read(id)
        if(result)
            res.status(200).send(result);
        else
            res.status(404).send({});
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const postBook = async (req, res, next) => {
    try {
        const book = {
            id: 0,
            title : req.body.title,
            author: req.body.author,
            cover : req.body.cover,
            genre : {
                id: req.body.genre.id
            },
            isbn  : req.body.isbn,
            publication: new Date(req.body.publication)
        }
        const result = await bookService.create(book)
        res.status(201).send(result);
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const putBook = async (req, res, next) => {
    try {
        const id = req.params.id
        const book = {
            id: req.body.id,
            title : req.body.title,
            author: req.body.author,
            cover : req.body.cover,
            genre : {
                id: req.body.genre.id
            },
            isbn  : req.body.isbn,
            publication: new Date(req.body.publication)
        }
        if (id != book.id)
            res.status(400).send({message: "'id' of url and request body must be the same"})
        else if (!await bookService.read(id))
            res.status(404).send({message: "register not found"})
        else{
            const result = await bookService.update(book)
            res.sendStatus(204)
        }
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id
        const book = await bookService.read(id)
        if (!book)
            res.status(404).send({message: "register not found"})
        else{
            await imageService.deleteImage(`${ book.id }-${ book.cover }`)
            const result = await bookService.delBook(id)
            res.status(200).send({
                result: result,
                msg: "Registro excluído com sucesso."
            })
        }
        next()
    } catch (error) {
        res.status(200).send({
            result: false,
            msg: "Erro inesperado de banco de dados."
        })
        next(error)
    }
}

const postImage = async (req, res, next) => {
    try {
        const result = await imageService.saveImage(req.file)
        if(result)
            res.sendStatus(200)
        else
            res.sendStatus(500)
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const putImage = async (req, res, next) => {
    try {
        let result = await imageService.deleteImage(req.params.previousImage)
        result ? result = await imageService.saveImage(req.file) : result = false
        if(result)
            res.sendStatus(200)
        else
            res.sendStatus(500)
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const getImage = async (req, res, next) => {
    try {
        let result = await imageService.getImage(req.body.fileName)
        if(result){
            res.set('content-type', 'image/png');
            res.send(result)
        }
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

module.exports = {
    getBooks,
    getBook,
    postBook,
    putBook,
    deleteBook,
    postImage,
    putImage,
    getImage
}