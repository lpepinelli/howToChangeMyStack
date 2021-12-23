import React from 'react'
import Head from '../Head'
import SearchCard from '../SearchCard'
import Title from '../Title'
import useFetch from '../Hooks/useFetch'

const Genres = () => {
    const [genres, setGenres] = React.useState(null);

    const {loading, request, error} = useFetch();

    React.useEffect(()=>{
        async function fetchGenres(url){
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
                    data={genres.map(({id, name})=>{
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
