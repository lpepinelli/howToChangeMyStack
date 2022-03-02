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
        res.status(200).send(result);
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}

const postGenre = async (req, res, next) => {
    try {
        const genre = {
          name : req.body.name
        }
        const result = await genreService.create(genre)
        res.status(200).send({
            status: 'Successful',
            insertId: result,
        });
        next()
    } catch (error) {
        res.status(500).json(error.message)
        next(error)
    }
}
module.exports = {
    getGenres,
    getGenre,
    postGenre
}