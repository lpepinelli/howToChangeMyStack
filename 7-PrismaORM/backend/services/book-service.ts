import bookDao from '../database/book-dal'
import MysqlPersistence from '../database/mysql-persistence'

const dbObj = new MysqlPersistence()

const listBooks = async () => {
    const conn = await dbObj.connect(false)
    try {
        const result = await bookDao.listBooks({dbObj, conn})
        dbObj.close()
        return result
    } catch(e) {
        dbObj.close()
        throw new Error(e as string)
    }
}

const read = async (id: number | string) => {
    const conn = await dbObj.connect(false)
    try {
        const result = await bookDao.readBook({id, dbObj, conn})
        dbObj.close()
        return result
    } catch(e) {
        dbObj.close()
        throw new Error(e as string)
    }
}

const create = async (book: book) => {
    const conn = await dbObj.connect(true)
    try {
        const result = await bookDao.createBook({book, dbObj, conn})
        if(result)
            conn.commit()
        dbObj.close()
        return result
    } catch(e) {
        conn.rollback()
        dbObj.close()
        throw new Error(e as string)
    }
}

const update = async (book: book) => {
    const conn = await dbObj.connect(true)
    try {
        const result = await bookDao.updateBook({book, dbObj, conn})
        if(result)
            conn.commit()
        dbObj.close()
        return result
    } catch(e) {
        conn.rollback()
        dbObj.close()
        throw new Error(e as string)
    }
}

const delBook = async (id: number | string) => {
    const conn = await dbObj.connect(true)
    try {
        const result = await bookDao.delBook({id, dbObj, conn})
        if(result)
            conn.commit()
        dbObj.close()
        return result
    } catch(e) {
        conn.rollback()
        dbObj.close()
        throw new Error(e as string)
    }
}

export default {
    listBooks,
    read,
    create,
    update,
    delBook
}