const listBooks = async (bdObj, conn) => {
    const sql = 'SELECT * FROM Book '+
                'inner join Genre on Book.gr_id = Genre.gr_id'
    const res = await bdObj.select(sql, conn)
    const books = []
    res.forEach(book => {
        books.push({
            id: book.bk_id,
            title : book.title,
            author: book.author,
            image : book.image,
            genre : {
                id: book.gr_id,
                name: book.name
            },
            isbn  : book.isbn,
            publication: book.publication
        })
    });
    return books
}

const read = async (id, bdObj, conn) => {
    const sql = 'SELECT * FROM Book '+
                'inner join Genre on Book.gr_id = Genre.gr_id ' +
                'where bk_id = ?'
    const book = await bdObj.select(sql, conn, [id])
    const res = {
        id: book[0].bk_id,
        title : book[0].title,
        author: book[0].author,
        image : book[0].image,
        genre : {
            id: book[0].gr_id,
            name: book[0].name
        },
        isbn  : book[0].isbn,
        publication: book[0].publication
    }
    return res
}

const create = async (book, bdObj, conn) => {
    const sql = 'insert into Book (title, author, cover, gr_id, isbn, publication) values(?, ?, ?, ?, ?, ?)'
    const res = await bdObj.execute(sql, conn, [book.title, book.author, book.cover, book.genre.id, book.isbn, book.publication])
    book.id = res
    return book
}

const update = async (book, bdObj, conn) => {
    const sql = 'update Book set title = ?, author = ?, cover = ?, '+
                'gr_id = ?, isbn = ?, publication = ? where bk_id = ?'
    const res = await bdObj.execute(sql, conn, [book.title, book.author, book.cover, book.genre.id, book.isbn, book.publication, book.id])
    return res
}

const delBook = async (id, bdObj, conn) => {
    const res = await bdObj.execute('delete from book where bk_id = ?', conn, [id])
    return res
}

module.exports = {
    listBooks,
    read,
    create,
    update,
    delBook
}