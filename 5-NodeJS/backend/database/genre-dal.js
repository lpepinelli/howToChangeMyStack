const listGenres = async (bdObj, conn) => {
    const res = await bdObj.select('SELECT gr_id as \'id\', name FROM Genre', conn)
    return res
}

const read = async (id, bdObj, conn) => {
    const res = await bdObj.select('SELECT gr_id as \'id\', name FROM Genre where gr_id = ?', conn, [id])
    return res[0]
}

const create = async (genre, bdObj, conn) => {
    const res = await bdObj.execute('insert into genre (name) values (?)', conn, [genre.name])
    genre.id = res
    return genre
}

const update = async (genre, bdObj, conn) => {
    const res = await bdObj.execute('update genre set name = ? where gr_id = ?', conn, [genre.name, genre.id])
    return res
}

const delGenre = async (id, bdObj, conn) => {
    const res = await bdObj.execute('delete from genre where gr_id = ?', conn, [id])
    return res
}

module.exports = {
    listGenres,
    read,
    create,
    update,
    delGenre
}