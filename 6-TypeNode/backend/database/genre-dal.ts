import MysqlPersistence from '../database/mysql-persistence'

type genreDalDTO = {
    id: number | string,
    genre: {
        id: number | string,
        name: string
    }
    bdObj: MysqlPersistence,
    conn: typeof globalThis.connection
}
//! bdOObj param is really necessary ?
const listGenres = async ({ bdObj, conn }: genreDalDTO) => {
    const res = await bdObj.select({
        query:'SELECT gr_id as \'id\', name FROM Genre',
        conn
    })
    return res
}

const readGenre = async ({ id, bdObj, conn }: genreDalDTO): Promise<genreDalDTO["genre"]> => {
    const res = await bdObj.select({
        query: 'SELECT gr_id as \'id\', name FROM Genre where gr_id = ?',
        conn,
        param: [id]
    }) as any
    return res[0]
}

const createGenre = async ({ genre, bdObj, conn }: genreDalDTO) => {
    const res = await bdObj.execute({
        query:'insert into genre (name) values (?)',
        conn,
        param: [genre.name]
    })
    genre.id = res
    return genre
}

const updateGenre = async ({ genre, bdObj, conn }: genreDalDTO) => {
    const res = await bdObj.execute({
        query: 'update genre set name = ? where gr_id = ?',
        conn,
        param: [genre.name, genre.id]
    })
    return res
}

const delGenre = async ({ id, bdObj, conn }: genreDalDTO) => {
    const res = await bdObj.execute({
        query: 'delete from genre where gr_id = ?',
        conn,
        param: [id]
    })
    return res
}

module.exports = {
    listGenres,
    readGenre,
    createGenre,
    updateGenre,
    delGenre
}