import React from 'react'
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Input, Select, Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';

const { Search } = Input;

type propTypes = {
    headers:Array<{
        title: string,
        dataIndex: string | string[],
        key?: string,
    }>,
    filters: Array<{
        label: string,
        value: string
    }>,
    data: Array<any>,
    entity: string,
    loading: boolean
}

const SearchCard = ({headers, filters, data, entity, loading}: propTypes) => {

  const [filter, setFilter] = React.useState(filters[0]);
  const [dataFilter, setDataFilter] = React.useState(data);

  function onSearch(value:string){
    console.log(value);
    //setData(props.data.filter(el => el[filter.property].toLowerCase().indexOf(search.toLowerCase()) > -1))
  }
    interface User {
      key: number;
      name: string;
    }

    const columns: ColumnsType<User> = [{
        title: 'Código',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
    }, ...headers,
    {
      title: 'Detalhes',
      key: 'details',
      render: (text :any, record :any) => (
        <Button type="default" icon={<EyeOutlined />}></Button>
      ),
      align: 'center'
    },]


  return (
    <>
        <Card title={
            <Input.Group compact>
            <Select defaultValue="title"
            size="large" onChange={(value)=>setFilter(filters.filter(el => el.value == value)[0])}
            options={filters}>
            </Select>
            <Search placeholder={`Pesquisa por ${filter.label}`} size="large" onSearch={onSearch} style={{ maxWidth: 600 }} />
            <Button type="primary" size="large" style={{marginLeft: 10}} icon={<PlusOutlined />}></Button>
          </Input.Group>
        }>
            <Table dataSource={data} rowKey="id" columns={columns} loading={loading} bordered={true} pagination={false}/>
        </Card>
    </>
  )
}

export default SearchCard