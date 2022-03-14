import { PrismaClient } from '@prisma/client'

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
                id
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
    try {
        prisma.$connect()
        return await prisma.genre.create({ data: genre })
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
    }
}

const update = async (genre: genre) => {
    try {
        prisma.$connect()
        return await prisma.genre.update({
            where: {
                id: genre.id
            },
            data: {
                name: genre.name
            }
        })
    } catch(e) {
        throw new Error(e as string)
    }
    finally{
        await prisma.$disconnect()
    }
}

const delGenre = async (id: number) => {
    try {
        prisma.$connect()
        const result =  await prisma.genre.delete({
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
    listGenres,
    read,
    create,
    update,
    delGenre
}