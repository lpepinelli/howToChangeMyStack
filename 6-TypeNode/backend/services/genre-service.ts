const genreDao = require('../database/genre-dal')
const bdObj = require('../database/mysql-persistence')

const listGenres = async () => {
    const conn = await bdObj.connect(false)
    try {
        const result = await genreDao.listGenres(bdObj, conn)
        conn.end()
        return result
    } catch(e) {
        conn.end()
        throw new Error(e)
    }
}

const read = async (id) => {
    const conn = await bdObj.connect(false)
    try {
        const result = await genreDao.read(id, bdObj, conn)
        conn.end()
        return result
    } catch(e) {
        conn.end()
        throw new Error(e)
    }
}

const create = async (genre) => {
    const conn = await bdObj.connect(true)
    try {
        const result = await genreDao.create(genre, bdObj, conn)
        if(result)
            conn.commit()
        conn.end()
        return result
    } catch(e) {
        conn.rollback()
        conn.end()
        throw new Error(e)
    }
}

const update = async (genre) => {
    const conn = await bdObj.connect(true)
    try {
        const result = await genreDao.update(genre, bdObj, conn)
        if(result)
            conn.commit()
        conn.end()
        return result
    } catch(e) {
        conn.rollback()
        conn.end()
        throw new Error(e)
    }
}

const delGenre = async (id) => {
    const conn = await bdObj.connect(true)
    try {
        const result = await genreDao.delGenre(id, bdObj, conn)
        if(result)
            conn.commit()
        conn.end()
        return result
    } catch(e) {
        conn.rollback()
        conn.end()
        throw new Error(e)
    }
}

module.exports = {
    listGenres,
    read,
    create,
    update,
    delGenre
}