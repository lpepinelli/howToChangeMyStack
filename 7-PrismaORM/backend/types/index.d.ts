interface  genre {
    id?: number,
    name: string,
    books?: book[]
}

interface  book {
    id?: number,
    title : string,
    author: string,
    cover : string,
    genre : {
        id?: number,
        name?: string
    },
    isbn  : string,
    publication: Date
}