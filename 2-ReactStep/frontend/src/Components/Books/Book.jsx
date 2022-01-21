import React from 'react'
import { useParams } from 'react-router-dom'

const Book = () => {
    const {id} = useParams();
    return (
        <>
            <h1>
                {"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+id}
            </h1>
            <h1>
                {"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+id}
            </h1>
        </>
    )
}

export default Book
