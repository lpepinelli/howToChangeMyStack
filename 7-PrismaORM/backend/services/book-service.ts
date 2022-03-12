import bookDao from '../database/book-dal'
import MysqlPersistence from '../database/mysql-persistence'
import { PrismaClient } from '@prisma/client'

const dbObj = new MysqlPersistence()

const prisma = new PrismaClient()

const listBooks = async () => {
    try {
        prisma.$connect()
        return await prisma.book.findMany({
            include: {
                genre: true,
            },
          })
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
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