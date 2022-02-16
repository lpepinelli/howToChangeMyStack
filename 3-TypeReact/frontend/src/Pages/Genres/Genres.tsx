import React from 'react'
import Title from '../../Components/Title'
import Head from '../../Components/Head'
import SearchCard from '../../Components/SearchCard'
import useFetch from '../../Components/Hooks/useFetch'

const Genres = () => {
    const [genres, setGenres] = React.useState([]);

    const {loading, request, error} = useFetch();

    React.useEffect(()=>{
        async function fetchGenres(url :string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok)
                setGenres(json);
            else
                console.error(error);
        }
        fetchGenres("https://localhost:5002/api/Genre");
    },[])

    if(loading) return <div className="loading">Loading</div>;
    if(error) return <p>{error}</p>
    if(genres===null) return null;
    type genreTypes = {
        id: number,
        name: string
    };
    return (
        <>
            <Head title="Consulta | Gêneros"/>
            <Title>Consulta - Gêneros</Title>
            <div className="content-body">
                {<SearchCard
                    headers={["Nome"
                    ]}
                    filters={[
                        {label: "Nome", property: "name"}
                    ]}
                    data={genres.map(({id, name}: genreTypes)=>{
                        return {id: id,
                                name: name}
                    })}
                    entity="Genre"
                />}
            </div>
        </>
    )
}

export default Genres
