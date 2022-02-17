import React from 'react'
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Input, Select, Button, Table } from 'antd'

const { Search } = Input;
const { Option } = Select;

const onSearch = (value:string) => console.log(value);

type propTypes = {
    headers:Array<{
        title: string,
        dataIndex: string,
        key?: string,
    }>,
    filters?: Array<{
        label: string,
        property: string
    }>,
    data?: Array<any>,
    entity?: string
}

const SearchCard = ({headers, filters, data, entity}: propTypes) => {

    const columns = [{
        title: 'Código',
        dataIndex: 'cod',
        key: 'cod',
        align: 'center',
    }, ...headers,
    {
      title: 'Detalhes',
      key: 'details',
      render: (text :any, record :any) => (
        <Button size="small" type="default" icon={<EyeOutlined />}></Button>
      ),
      align: 'center',
    },]


  return (
    <>
        <Card title={
            <Input.Group compact>
            <Select defaultValue="title" size="large">
              <Option value="title">Filtro: Título</Option>
              <Option value="genre">Filtro: Gênero</Option>
            </Select>
            <Search placeholder="Pesquisar por FILTRO" size="large" onSearch={onSearch} style={{ maxWidth: 600 }} />
            <Button type="primary" size="large" style={{marginLeft: 10}} icon={<PlusOutlined />}></Button>
          </Input.Group>
        }>
            <Table columns={[
            {
                title: 'Código',
                dataIndex: 'cod',
                key: 'cod',
                align: 'center',
            },
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
            {
              title: 'Detalhes',
              key: 'details',
              render: (text, record) => (
                <Button size="small" type="default" icon={<EyeOutlined />}></Button>
              ),
              align: 'center',
            },
            ]}/>
        </Card>
    </>
  )
}

export default SearchCard