import db from '../database/mysql-persistence'

type genreDalDTO = {
    id?: number | string,
    genre: {
        id: number | string,
        name: string
    }
    bdObj: typeof(db)
}

const listGenresDb = async (bdObj, conn) => {
    const res = await bdObj.select('SELECT gr_id as \'id\', name FROM Genre', conn)
    return res
}

const readDb = async (id, bdObj, conn) => {
    const res = await bdObj.select('SELECT gr_id as \'id\', name FROM Genre where gr_id = ?', conn, [id])
    return res[0]
}

const createDb = async (genre, bdObj, conn) => {
    const res = await bdObj.execute('insert into genre (name) values (?)', conn, [genre.name])
    genre.id = res
    return genre
}

const updateDb = async (genre, bdObj, conn) => {
    const res = await bdObj.execute('update genre set name = ? where gr_id = ?', conn, [genre.name, genre.id])
    return res
}

const delGenreDb = async (id, bdObj, conn) => {
    const res = await bdObj.execute('delete from genre where gr_id = ?', conn, [id])
    return res
}

module.exports = {
    listGenresDb,
    readDb,
    createDb,
    updateDb,
    delGenreDb
}