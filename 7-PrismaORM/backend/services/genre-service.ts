import genreDao from '../database/genre-dal'
import { PrismaClient } from '@prisma/client'
import MysqlPersistence from '../database/mysql-persistence'

const dbObj = new MysqlPersistence()

const prisma = new PrismaClient()

const listGenres = async () => {
    try {
        prisma.$connect()
        return await prisma.genre.findMany()
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
    }
}

const read = async (id: number) => {
    try {
        prisma.$connect()
        return await prisma.genre.findUnique({
            where: {
                id: id
            },
          })
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
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