import React from 'react';
import { Typography } from 'antd'
import SearchCard from '../../Components/SearchCard';
import useFetch from '../../Hooks/useFetch';

const {Title} = Typography;


const Books = () => {

    const [books, setBooks] = React.useState([]);
    const {loading, request} = useFetch();

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

  return (
      <>
        <Title level={3}>Consulta Livros</Title>
        <SearchCard headers={[
            {
                title: 'Título',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Gênero',
                dataIndex: ["genre", "name"],
                key: 'genre',
            },
            {
                title: 'Autor',
                dataIndex: 'author',
                key: 'author',
            },
        ]}
        filters={[
            {
                label: 'Título',
                value: 'title',
            },
            {
                label: 'Gênero',
                value: 'genre'
            }
        ]}
        data={books}
        entity="Book"
        loading={loading} />
      </>
  )
}

export default Books