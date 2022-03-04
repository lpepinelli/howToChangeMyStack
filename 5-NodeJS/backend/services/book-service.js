const bookDao = require('../database/book-dal')
const bdObj = require('../database/mysql-persistence')

const listBooks = async () => {
    const conn = await bdObj.connect(false)
    try {
        const result = await bookDao.listBooks(bdObj, conn)
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
        const result = await bookDao.read(id, bdObj, conn)
        conn.end()
        return result
    } catch(e) {
        conn.end()
        throw new Error(e)
    }
}

const create = async (book) => {
    const conn = await bdObj.connect(true)
    try {
        const result = await bookDao.create(book, bdObj, conn)
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

const update = async (book) => {
    const conn = await bdObj.connect(true)
    try {
        const result = await bookDao.update(book, bdObj, conn)
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

const delBook = async (id) => {
    const conn = await bdObj.connect(true)
    try {
        const result = await bookDao.delBook(id, bdObj, conn)
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
    listBooks,
    read,
    create,
    update,
    delBook
}