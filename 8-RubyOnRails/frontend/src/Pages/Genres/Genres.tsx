import React from "react";
import { Typography } from "antd";
import SearchCard from "../../Components/SearchCard";
import useFetch from "../../Hooks/useFetch";
import Head from "../../Components/Head";

const { Title } = Typography;

function Genres() {
  const [genres, setGenres] = React.useState([]);
  const { loading, request, error } = useFetch();

  React.useEffect(() => {
    async function fetchGenres(url: string) {
      const { response, json, error } = await request(url, "READ");
      if (response.ok) setGenres(json);
      else console.error(error);
    }
    fetchGenres("https://localhost:5002/api/Genre");
  }, []);

  return (
    <>
      <Head title="Consulta | Gêneros" />
      <Title level={3}>Consulta - Gêneros</Title>
      <SearchCard
        headers={[
          {
            title: "Nome",
            dataIndex: "name",
            key: "name",
          },
        ]}
        filters={[
          {
            label: "Nome",
            value: "name",
          },
        ]}
        data={genres}
        entity="Genre"
        loading={loading}
      />
    </>
  );
}

export default Genres;
