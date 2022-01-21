import React from 'react'
import { useParams } from 'react-router-dom'

const Genre = () => {
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

export default Genre
