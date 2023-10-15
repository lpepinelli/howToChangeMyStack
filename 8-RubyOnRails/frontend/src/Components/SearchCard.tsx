import React from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Input, Select, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

const { Search } = Input;

type propTypes = {
  headers: Array<{
    title: string;
    dataIndex: string | string[];
    key?: string;
  }>;
  filters: Array<{
    label: string;
    value: string;
  }>;
  data: Array<any>;
  entity: string;
  loading: boolean;
};

const SearchCard = ({ headers, filters, data, entity, loading }: propTypes) => {
  const [filter, setFilter] = React.useState(filters[0]);
  const [dataFilter, setDataFilter] = React.useState<typeof data>([]);
  const [loadingSearch, setLoadingSearch] = React.useState(false);

  React.useEffect(() => {
    setDataFilter(data);
  }, [data]);

  function onSearch(value: string) {
    setLoadingSearch(true);
    setTimeout(function () {
      setDataFilter(
        data.filter(
          (el) =>
            el[filter.value].toLowerCase().indexOf(value.toLowerCase()) > -1,
        ),
      );
      setLoadingSearch(false);
    }, 250);
  }
  interface User {
    key: number;
    name: string;
  }

  const columns: ColumnsType<User> = [
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    ...headers,
    {
      title: "Detalhes",
      key: "details",
      render: (text: any, record: any) => (
        <Link to={`/${entity}/Details/${record.id}`}>
          <Button type="default" icon={<EyeOutlined />}></Button>
        </Link>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <Card
        title={
          <Input.Group compact>
            <Select
              defaultValue={filter.value}
              size="large"
              onChange={(value) =>
                setFilter(filters.filter((el) => el.value == value)[0])
              }
              options={filters}
            ></Select>
            <Search
              placeholder={`Pesquisa por ${filter.label}`}
              size="large"
              onSearch={onSearch}
              style={{ maxWidth: 600 }}
            />
            <Link to={`/${entity}/Create`}>
              <Button
                type="primary"
                size="large"
                style={{ marginLeft: 10 }}
                icon={<PlusOutlined />}
              ></Button>
            </Link>
          </Input.Group>
        }
      >
        <Table
          dataSource={dataFilter}
          rowKey="id"
          columns={columns}
          loading={loadingSearch ? loadingSearch : loading}
          bordered={true}
          pagination={false}
        />
      </Card>
    </>
  );
};

export default SearchCard;
