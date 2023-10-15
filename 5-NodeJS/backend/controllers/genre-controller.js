const genreService = require('../services/genre-service')


const getGenres = async (req, res, next) => {
    try {
        const result = await genreService.listGenres()
        res.status(200).send(result);
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const getGenre = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await genreService.read(id)
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

const postGenre = async (req, res, next) => {
    try {
        const genre = {
            id: 0,
            name : req.body.name
        }
        const result = await genreService.create(genre)
        res.status(201).send(result);
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const putGenre = async (req, res, next) => {
    try {
        const id = req.params.id
        const genre = {
            id: req.body.id,
            name : req.body.name
        }
        if (id != genre.id)
            res.status(400).send({message: "'id' of url and request body must be the same"})
        else if (!await genreService.read(id))
            res.status(404).send({message: "register not found"})
        else{
            const result = await genreService.update(genre)
            res.sendStatus(204)
        }
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const deleteGenre = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!await genreService.read(id))
            res.status(404).send({message: "register not found"})
        else{
            const result = await genreService.delGenre(id)
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

module.exports = {
    getGenres,
    getGenre,
    postGenre,
    putGenre,
    deleteGenre
}