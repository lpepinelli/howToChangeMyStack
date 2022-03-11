import MysqlPersistence from '../database/mysql-persistence'

type bookDalDTO = {
    id: number | string,
    book: {
        id: number | string,
        title : string,
        author: string,
        cover : string,
        genre : {
            id: number | string,
            name: string
        },
        isbn  : string,
        publication: string
    }
    bdObj: MysqlPersistence,
    conn: typeof globalThis.connection
}

type tableType = {
    bk_id: number | string,
    title : string,
    author: string,
    cover : string,
    gr_id: number | string,
    name: string,
    isbn  : string,
    publication: string
}

const listBooks = async ({ bdObj, conn }: bookDalDTO) => {
    const query = 'SELECT * FROM Book '+
                'inner join Genre on Book.gr_id = Genre.gr_id'
    const res = await bdObj.select({query, conn}) as any
    const books: bookDalDTO["book"][] = []
    res.forEach((book: tableType) => {
        books.push({
            id: book.bk_id,
            title : book.title,
            author: book.author,
            cover : book.cover,
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

const read = async ({ id, bdObj, conn }: bookDalDTO) => {
    const query = 'SELECT * FROM Book '+
                'inner join Genre on Book.gr_id = Genre.gr_id ' +
                'where bk_id = ?'
    const book = await bdObj.select({query, conn, param: [id]}) as any
    const res : bookDalDTO["book"] = {
        id: book[0].bk_id,
        title : book[0].title,
        author: book[0].author,
        cover : book[0].cover,
        genre : {
            id: book[0].gr_id,
            name: book[0].name
        },
        isbn  : book[0].isbn,
        publication: book[0].publication
    }
    return res
}

const create = async ({ book, bdObj, conn }: bookDalDTO) => {
    const query = 'insert into Book (title, author, cover, gr_id, isbn, publication) values(?, ?, ?, ?, ?, ?)'
    const res = await bdObj.execute({query, conn, param: [book.title, book.author, book.cover, book.genre.id, book.isbn, book.publication]})
    book.id = res
    return book
}

const update = async ({ book, bdObj, conn }: bookDalDTO) => {
    const query = 'update Book set title = ?, author = ?, cover = ?, '+
                'gr_id = ?, isbn = ?, publication = ? where bk_id = ?'
    const res = await bdObj.execute({query, conn, param: [book.title, book.author, book.cover, book.genre.id, book.isbn, book.publication, book.id]})
    return res
}

const delBook = async ({ id, bdObj, conn }: bookDalDTO) => {
    const res = await bdObj.execute({
        query: 'delete from book where bk_id = ?',
        conn,
        param: [id]
    })
    return res
}

module.exports = {
    listBooks,
    read,
    create,
    update,
    delBook
}