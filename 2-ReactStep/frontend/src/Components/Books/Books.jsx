import React from 'react'
import Head from '../Head'
import SearchCard from '../SearchCard'
import Title from '../Title'
import useFetch from '../Hooks/useFetch'

const Books = () => {
    const [books, setBooks] = React.useState(null);

    const {loading, request, error} = useFetch();

    React.useEffect(()=>{
        async function fetchBooks(url){
            const {response, json, error} = await request(url, "READ");
            if(response.ok)
                setBooks(json);
            else
                console.error(error);
        }
        fetchBooks("https://localhost:5002/api/Book");
    },[])

    if(loading) return <div className="loading">Loading</div>;
    if(error) return <p>{error}</p>
    if(books===null) return null;
    return (
        <>
            <Head title="Consulta - Livros"/>
            <Title>Consulta - Livros</Title>
            <div className="content-body">
                {<SearchCard
                    headers={["Título",
                        "Gênero",
                        "Autor"
                    ]}
                    filters={[
                        {label: "Título", property: "title"},
                        {label: "Gênero", property: "genre"}
                    ]}
                    data={books.map((book)=>{
                        return [{id: book.id},
                                book.title,
                                book.genre.name,
                                book.author]
                    })}
                    entity="Book"
                />}
            </div>
        </>
    )
}

export default Books
