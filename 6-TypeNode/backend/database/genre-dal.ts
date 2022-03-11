import MysqlPersistence from '../database/mysql-persistence'

export type genreDalDTO = {
    id: number | string,
    genre: genre
    dbObj: MysqlPersistence,
    conn: typeof globalThis.connection
}
//! dbOObj param is really necessary ? idk
const listGenres = async ({ dbObj, conn }: Pick<genreDalDTO, "dbObj" | "conn">) => {
    const res = await dbObj.select({
        query:'SELECT gr_id as \'id\', name FROM Genre',
        conn
    })
    return res
}

const readGenre = async ({ id, dbObj, conn }: Omit<genreDalDTO, "genre">): Promise<genreDalDTO["genre"]> => {
    const res = await dbObj.select({
        query: 'SELECT gr_id as \'id\', name FROM Genre where gr_id = ?',
        conn,
        param: [id]
    }) as any
    return res[0]
}

const createGenre = async ({ genre, dbObj, conn }: Omit<genreDalDTO, "id">) => {
    const res = await dbObj.execute({
        query:'insert into genre (name) values (?)',
        conn,
        param: [genre.name]
    })
    genre.id = res
    return genre
}

const updateGenre = async ({ genre, dbObj, conn }: Omit<genreDalDTO, "id">) => {
    const res = await dbObj.execute({
        query: 'update genre set name = ? where gr_id = ?',
        conn,
        param: [genre.name, genre.id]
    })
    return res
}

const delGenre = async ({ id, dbObj, conn }: Omit<genreDalDTO, "genre">) => {
    const res = await dbObj.execute({
        query: 'delete from genre where gr_id = ?',
        conn,
        param: [id]
    })
    return res
}

export default {
    listGenres,
    readGenre,
    createGenre,
    updateGenre,
    delGenre
}