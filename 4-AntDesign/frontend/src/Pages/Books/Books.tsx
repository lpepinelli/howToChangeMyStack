import { Typography } from 'antd'
import SearchCard from '../../Components/SearchCard';

const {Title} = Typography;


const Books = () => {
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
                dataIndex: 'genre',
                key: 'genre',
            },
            {
                title: 'Autor',
                dataIndex: 'author',
                key: 'author',
            },
        ]} />
      </>
  )
}

export default Books