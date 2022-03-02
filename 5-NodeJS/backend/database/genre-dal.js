const bdObj = require('./mysql-persistence')

const listGenres = async () => {
    const conn = await bdObj.connect()
    const res = await bdObj.select('SELECT * FROM Genre', conn)
    conn.end()
    return res
}

const read = async (id) => {
    const conn = await bdObj.connect()
    const res = await bdObj.select('SELECT * FROM Genre where gr_id = ?', conn, [id])
    conn.end()
    return res[0]
}

const create = async (genre) => {
    const conn = await bdObj.connect()
    const res = await bdObj.execute('insert into genre (name) values (?)', conn, [genre.name])
    conn.end()
    return res
}

module.exports = {
    listGenres,
    read,
    create
}