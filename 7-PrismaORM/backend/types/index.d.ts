interface  genre {
    id: number | string
    name: string
}

interface  book {
    id: number | string,
    title : string,
    author: string,
    cover : string,
    genre : {
        id: number | string,
        name?: string
    },
    isbn  : string,
    publication: Date
}