import {
  ArrowLeftOutlined,
  BookFilled,
  DeleteOutlined,
  EditOutlined,
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
  Modal,
} from "antd";
import React from "react";
import { MaskedInput } from "antd-mask-input";
import Head from "../../Components/Head";
import useFetch, { BASE_URL } from "../../Hooks/useFetch";
import useMessage from "../../Hooks/useMessage";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import type { UploadFile } from 'antd/es/upload/interface';

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { span: 8 },
};

const Book = () => {
  const [edit, setEdit] = React.useState(false);
  type bookTypes = {
    id: number;
    title: string;
    author: string;
    cover: string;
    genre: {
      id: number;
      name?: string;
    };
    isbn: string;
    publication: Date;
  };
  const [book, setBook] = React.useState<bookTypes>();
  const [genres, setGenres] = React.useState();
  const [isbnRaw, setIsbnRaw] = React.useState("");
  const [form] = Form.useForm();
  const { request, loading } = useFetch();
  const { id } = useParams();
  const { resultMessage, confirmMessage } = useMessage("/");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');

  React.useEffect(() => {
    async function fetchGenres(url: string) {
      const { response, json, error } = await request(url, "READ");
      if (response.ok) setGenres(json);
      else console.error(error);
    }
    fetchGenres("/genres");
  }, []);

  React.useEffect(() => {
    async function fetchBook(url: string) {
      const { response, json, error } = await request(url, "READ");
      if (response.ok) {
        setBook(json);
        form.setFieldsValue({ id: json.id });
        form.setFieldsValue({ title: json.title });
        form.setFieldsValue({ author: json.author });
        form.setFieldsValue({ genre: json.genre.id });
        form.setFieldsValue({ isbn: json.isbn });
        setIsbnRaw(json.isbn);
        form.setFieldsValue({ publication: moment(json.publication) });
        if(json.cover) {
          let imgUrl: string = await getCover(`${json.id}-${json.cover}`);
          form.setFieldsValue({
            cover: [
              {
                uid: "-1",
                name: json.cover,
                status: "done",
                thumbUrl: imgUrl,
              },
            ],
          });
        }
      } else console.error(error);
    }
    fetchBook(`/books/${id}`);
  }, []);

  function handleCancel() {
    setPreviewOpen(false);
  }

  async function handlePreview (file: UploadFile) {
    console.log(file)

    setPreviewImage(file.thumbUrl || "");
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  }

  async function getAsyncFile(blob: Blob) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async function getCover(fileName: string) {
    const response = await fetch(`${BASE_URL}/images/getby?filename=${fileName}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      }
    });

    if (response.ok) {
      const blob = await response.blob();
      const Url = await getAsyncFile(blob);
      return Url as string;
    }
    return "";
  }

  async function initState() {
    if (book) {
      form.setFieldsValue({ title: book.title });
      form.setFieldsValue({ author: book.author });
      form.setFieldsValue({ genre: book.genre.id });
      form.setFieldsValue({ isbn: book.isbn });
      form.setFieldsValue({ publication: moment(book.publication) });
      let imgUrl: string = await getCover(`${book.id}-${book.cover}`);
      form.setFieldsValue({
        cover: [
          {
            uid: "-1",
            name: book.cover,
            status: "done",
            thumbUrl: imgUrl,
          },
        ],
      });
    }
    setEdit(false);
  }

  async function updateImage(bk_id: number, previousImage: string, file: File) {
    let formData = new FormData();
    let auxName = "";

    auxName = `${bk_id}-${file.name}`;
    formData.append("image[cover]", file, auxName);

    const options = {
      method: previousImage ? "PUT" : "POST",
      body: formData,
      processData: false,
      contentType: false,
    };

    const { response, error } = await request(
      previousImage ? `/images/updateby?previousFile=${bk_id}-${previousImage}` : '/images',
      "CREATE",
      null,
      options,
    );
    response.ok ? resultMessage("edit") : resultMessage("edit", error);
  }

  const onFinish = (values: any) => {
    let file: File;
    let previousImage = book ? book.cover : "";
    values.isbn = isbnRaw;
    values.publication = values.publication.toDate();
    values.genre_id = values.genre
    if (values.cover) {
      file = values.cover[0].originFileObj;
      values.cover = values.cover[0].name;
    }
    confirmMessage("edit", async function () {
      const { response, error, json } = await request(
        `/books/${id}`,
        "UPDATE",
        values,
      );
      response.ok
        ? values.cover && values.cover != previousImage
          ? updateImage(values.id, previousImage, file)
          : resultMessage("edit")
        : resultMessage("edit", error);
    });
  };


  async function handleDelete() {
    confirmMessage("delete", async function () {
      const { json, response, error } = await request(
        `/books/${id}?filename=${id}-${form.getFieldValue("cover")[0].name}`,
        "DELETE",
      );
      if (response.ok) {
        setEdit(false);
        resultMessage("delete")
      } else resultMessage("delete", error ? error : null);
    });
  }

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
      <Head title="Detalhes | Livros" />
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
          <Form.Item name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Row gutter={18}>
            <Col span={8}>
              <Form.Item
                name="title"
                label="Título"
                rules={[{ required: true }]}
              >
                <Input placeholder="Título" disabled={!edit} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="author"
                label="Autor"
                rules={[{ required: true }]}
              >
                <Input placeholder="Autor" disabled={!edit} />
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
                  disabled={!edit}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="publication"
                label="Data de Publicação"
                rules={[{ required: true }]}
              >
                <DatePicker format={"DD/MM/YYYY"} disabled={!edit} />
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
                <MaskedInput
                  mask="1-1111-1111-1"
                  placeholder="ISBN"
                  disabled={!edit}
                />
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
                  onPreview={handlePreview}
                  maxCount={1}
                  disabled={!edit}
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
          <Row>
            <Col span={2}>
              <Button
                type="primary"
                style={!edit ? { display: "none" } : { display: "block" }}
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Salvar
              </Button>
              <Button
                type="default"
                style={edit ? { display: "none" } : { display: "block" }}
                htmlType="button"
                icon={<EditOutlined />}
                onClick={() => setEdit(true)}
              >
                Editar
              </Button>
            </Col>
            <Col span={2}>
              {edit ? (
                <Button
                  htmlType="button"
                  icon={<ArrowLeftOutlined />}
                  onClick={initState}
                >
                  Voltar
                </Button>
              ) : (
                <Link to="/">
                  <Button htmlType="button" icon={<ArrowLeftOutlined />}>
                    Voltar
                  </Button>
                </Link>
              )}
            </Col>
            <Col offset={18} span={2}>
              <Button
                type="primary"
                danger
                htmlType="button"
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Excluir
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Book;
