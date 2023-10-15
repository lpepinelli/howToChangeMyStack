import MysqlPersistence from '../database/mysql-persistence'

type bookDalDTO = {
    id: number | string,
    book: book
    dbObj: MysqlPersistence,
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

const listBooks = async ({ dbObj, conn }: Pick<bookDalDTO, "dbObj" | "conn">) => {
    const query = 'SELECT * FROM Book '+
                'inner join Genre on Book.gr_id = Genre.gr_id'
    const res = await dbObj.select({query, conn}) as any
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
            publication: new Date(book.publication)
        })
    });
    return books
}

const readBook = async ({ id, dbObj, conn }: Omit<bookDalDTO, "book">) => {
    const query = 'SELECT * FROM Book '+
                'inner join Genre on Book.gr_id = Genre.gr_id ' +
                'where bk_id = ?'
    const book = await dbObj.select({query, conn, param: [id]}) as any
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
        publication: new Date(book.publication)
    }
    return res
}

const createBook = async ({ book, dbObj, conn }: Omit<bookDalDTO, "id">) => {
    const query = 'insert into Book (title, author, cover, gr_id, isbn, publication) values(?, ?, ?, ?, ?, ?)'
    const res = await dbObj.execute({query, conn, param: [book.title, book.author, book.cover, book.genre.id, book.isbn, book.publication]})
    book.id = res
    return book
}

const updateBook = async ({ book, dbObj, conn }: Omit<bookDalDTO, "id">) => {
    const query = 'update Book set title = ?, author = ?, cover = ?, '+
                'gr_id = ?, isbn = ?, publication = ? where bk_id = ?'
    const res = await dbObj.execute({query, conn, param: [book.title, book.author, book.cover, book.genre.id, book.isbn, book.publication, book.id]})
    return res
}

const delBook = async ({ id, dbObj, conn }: Omit<bookDalDTO, "book">) => {
    const res = await dbObj.execute({
        query: 'delete from book where bk_id = ?',
        conn,
        param: [id]
    })
    return res
}

export default {
    listBooks,
    readBook,
    createBook,
    updateBook,
    delBook
}