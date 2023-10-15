import genreDao from '../database/genre-dal'
import MysqlPersistence from '../database/mysql-persistence'

const dbObj = new MysqlPersistence()

const listGenres = async () => {
    const conn = await dbObj.connect(false)
    try {
        const result = await genreDao.listGenres({dbObj, conn})
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
        const result = await genreDao.readGenre({id, dbObj, conn})
        dbObj.close()
        return result
    } catch(e) {
        dbObj.close()
        throw new Error(e as string)
    }
}

const create = async (genre: genre) => {
    const conn = await dbObj.connect(true)
    try {
        const result = await genreDao.createGenre({genre, dbObj, conn})
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

const update = async (genre: genre) => {
    const conn = await dbObj.connect(true)
    try {
        const result = await genreDao.updateGenre({genre, dbObj, conn})
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

const delGenre = async (id: number | string) => {
    const conn = await dbObj.connect(true)
    try {
        const result = await genreDao.delGenre({id, dbObj, conn})
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
    listGenres,
    read,
    create,
    update,
    delGenre
}