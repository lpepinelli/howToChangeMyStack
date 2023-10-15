import React from 'react'
import Head from '../../Components/Head'
import SearchCard from '../../Components/SearchCard'
import Title from '../../Components/Title'
import useFetch from '../../Components/Hooks/useFetch'

const Books = () => {
    const [books, setBooks] = React.useState([]);

    const {loading, request, error} = useFetch();

    React.useEffect(()=>{
        async function fetchBooks(url:string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok)
                setBooks(json);
            else
                console.error(error);
        }
        fetchBooks("https://localhost:5002/api/Book");
    },[])

    type bookTypes = {
        id: number,
        title: string,
        genre: {
            name: string,
        },
        author: string,
    };

    if(loading) return <div className="loading">Loading</div>;
    if(error) return <p>{error}</p>
    if(books===null) return null;
    return (
        <>
            <Head title="Consulta | Livros"/>
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
                    data={books.map((book:bookTypes)=>{
                        return {id: book.id,
                                title: book.title,
                                genre: book.genre.name,
                                author: book.author}
                    })}
                    entity="Book"
                />}
            </div>
        </>
    )
}

export default Books
