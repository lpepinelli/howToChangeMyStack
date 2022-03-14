import { PrismaClient } from '@prisma/client'

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

const read = async (id: number) => {
    try {
        prisma.$connect()
        return await prisma.book.findUnique({
            where: {
                id
            },
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

const create = async (book: book) => {
    try {
        prisma.$connect()
        const created =  await prisma.book.create({ data: {
            title: book.title,
            author: book.author,
            cover: book.cover,
            genre: {
                connect: book.genre
            },
            isbn: book.isbn,
            publication: book.publication
        } })
        book.id = created.id
        return book
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
    }
}

const update = async (book: book) => {
    try {
        prisma.$connect()
        return await prisma.book.update({
            where: {
                id: book.id
            },
            data: {
                title: book.title,
                author: book.author,
                cover: book.cover,
                genre: {
                    connect: book.genre
                },
                isbn: book.isbn,
                publication: book.publication
            }
        })
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
    }
}

const delBook = async (id: number) => {
    try {
        prisma.$connect()
        const result =  await prisma.book.delete({
            where:{
                id
            }
        })
        if(result)
            return true
        else
            return false
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
    }
}

export default {
    listBooks,
    read,
    create,
    update,
    delBook
}