import {
  ArrowLeftOutlined,
  BookFilled,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Card,
  Divider,
  Space,
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Upload,
} from "antd";
import React from "react";
import { MaskedInput } from "antd-mask-input";
import { Link } from "react-router-dom";
import Head from "../../Components/Head";
import useFetch from "../../Hooks/useFetch";
import useMessage from "../../Hooks/useMessage";

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { span: 8 },
};

const BookCreate = () => {
  const [form] = Form.useForm();
  const { request } = useFetch();
  type genreTypes = Array<{
    id: string;
    name: string;
  }>;
  const [genres, setGenres] = React.useState<genreTypes>([]);
  const { resultMessage, confirmMessage } = useMessage("/");
  const [isbnRaw, setIsbnRaw] = React.useState("");

  React.useEffect(() => {
    async function fetchGenres(url: string) {
      const { response, json, error } = await request(url, "READ");
      if (response.ok) setGenres(json);
      else console.error(error);
    }
    fetchGenres("/genres");
  }, []);

  async function saveImage(bk_id: number, file: File) {
    let formData = new FormData();
    let auxName = "";

    auxName = `${bk_id}-${file.name}`;
    formData.append("image[cover]", file, auxName);

    const options = {
      method: "POST",
      body: formData,
      processData: false,
      contentType: false,
    };

    const { response, error } = await request(
      "/images",
      "CREATE",
      null,
      options,
    );
    response.ok ? resultMessage("save") : resultMessage("save", error);
  }

  const onFinish = (values: any) => {
    //console.log(values.publication.toDate())
    let file: File;
    values.isbn = isbnRaw;
    values.publication = values.publication.toDate();
    values.genre_id = values.genre
    if (values.cover) {
      file = values.cover[0].originFileObj;
      values.cover = values.cover[0].name;
    }
    confirmMessage("save", async function () {
      const { response, error, json } = await request(
        "/books",
        "CREATE",
        values,
      );
      response.ok
        ? values.cover
          ? saveImage(json.id, file)
          : resultMessage("save")
        : resultMessage("save", error);
    });
  };

  const normFile = (e: any) => {
    //console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const normInptMask = (e: any) => {
    setIsbnRaw(e.target.value.replaceAll(new RegExp("-|_", "g"), ""));
  };

  return (
    <>
      <Head title="Cadastro | Livros" />
      <Card>
        <Space>
          <Title level={4}>
            <BookFilled />
          </Title>
          <Title level={4}>Livros</Title>
        </Space>
        <hr />
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Row gutter={18}>
            <Col span={8}>
              <Form.Item
                name="title"
                label="Título"
                rules={[{ required: true }]}
              >
                <Input placeholder="Título" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="author"
                label="Autor"
                rules={[{ required: true }]}
              >
                <Input placeholder="Autor" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="genre"
                label="Gênero"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Selecione"
                  fieldNames={{
                    label: "name",
                    value: "id",
                  }}
                  options={genres}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="publication"
                label="Data de Publicação"
                rules={[{ required: true }]}
              >
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="isbn"
                label="ISBN"
                getValueFromEvent={normInptMask}
              >
                <MaskedInput mask="1-1111-1111-1" placeholder="ISBN" />
              </Form.Item>
            </Col>
            <Col span={8} offset={8}>
              <Form.Item
                name="cover"
                label="Imagem"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="logo"
                  customRequest={({ file, onSuccess }) => {
                    setTimeout(() => {
                      onSuccess ? onSuccess("ok") : null;
                    }, 0);
                  }}
                  listType="picture-card"
                  maxCount={1}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Carregar</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Salvar
              </Button>
              <Link to="/">
                <Button htmlType="button" icon={<ArrowLeftOutlined />}>
                  Voltar
                </Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default BookCreate;
