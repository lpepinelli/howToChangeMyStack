import React from "react";
import { Typography } from "antd";
import SearchCard from "../../Components/SearchCard";
import useFetch from "../../Hooks/useFetch";
import Head from "../../Components/Head";

const { Title } = Typography;

const Books = () => {
  const [books, setBooks] = React.useState([]);
  const { loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchBooks(url: string) {
      const { response, json, error } = await request(url, "READ");
      if (response.ok) setBooks(json);
      else console.error(error);
    }
    fetchBooks("/books");
  }, []);

  type bookTypes = {
    id: number;
    title: string;
    genre: {
      name: string;
    };
    author: string;
  };

  return (
    <>
      <Head title="Consulta | Livros" />
      <Title level={3}>Consulta - Livros</Title>
      <SearchCard
        headers={[
          {
            title: "Título",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Gênero",
            dataIndex: "genre",
            key: "genre",
          },
          {
            title: "Autor",
            dataIndex: "author",
            key: "author",
          },
        ]}
        filters={[
          {
            label: "Título",
            value: "title",
          },
          {
            label: "Gênero",
            value: "genre",
          },
        ]}
        data={books.map((book: bookTypes) => {
          return {
            id: book.id,
            title: book.title,
            genre: book.genre.name,
            author: book.author,
          };
        })}
        entity="Book"
        loading={loading}
      />
    </>
  );
};

export default Books;
