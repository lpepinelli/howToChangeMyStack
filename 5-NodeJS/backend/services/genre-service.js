const genreDao = require('../database/genre-dal')

const listGenres = async () => {
    try {
        return await genreDao.listGenres()
    } catch(e) {
        throw new Error(e)
    }
}

const read = async (id) => {
    try {
        return await genreDao.read(id)
    } catch(e) {
        throw new Error(e)
    }
}

const create = async (genre) => {
    try {
        return await genreDao.create(genre)
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    listGenres,
    read,
    create
}