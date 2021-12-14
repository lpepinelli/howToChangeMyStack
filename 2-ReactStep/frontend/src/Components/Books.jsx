import React from 'react'
import Head from './Head'
import SearchCard from './SearchCard'
import Title from './Title'
import useFetch from './Hooks/useFetch'

const Books = () => {
    const [books, setBooks] = React.useState(null);

    const {loading, error, request, data} = useFetch();

    React.useEffect(()=>{
        async function fetchBooks(url){
            const {response} = await request(url, "READ");
            if(response.ok)
                setBooks(data);
            else
                console.error(error);

        }
        fetchBooks("https://localhost:5002/api/Book");

    }, [])

    return (
        <>
            <Head title="Consulta - Livros"/>
            <Title>Consulta - Livros</Title>
            <div className="content-body">
                <SearchCard
                    filters={[
                        {label: "Título", property: "title"},
                        {label: "Gênero", property: "genre"}
                    ]}
                    data={books}
                />
            </div>
        </>
    )
}

export default Books
