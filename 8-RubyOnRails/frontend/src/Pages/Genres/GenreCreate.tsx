import {
  ArrowLeftOutlined,
  BarsOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Card, Divider, Space, Typography, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import Head from "../../Components/Head";
import useFetch from "../../Hooks/useFetch";
import useMessage from "../../Hooks/useMessage";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { span: 8 },
};

function GenreCreate() {
  const [form] = Form.useForm();
  const { request } = useFetch();
  const { resultMessage, confirmMessage } = useMessage("/Genre");

  const onFinish = (values: any) => {
    confirmMessage("save", async function () {
      const { response, error } = await request(
        "https://localhost:5002/api/Genre",
        "CREATE",
        values,
      );
      response.ok ? resultMessage("save") : resultMessage("save", error);
    });
  };

  return (
    <>
      <Head title="Cadastro | Gêneros" />
      <Card>
        <Space>
          <Title level={4}>
            <BarsOutlined />
          </Title>
          <Title level={4}>Gênero</Title>
        </Space>
        <hr />
        <Form
          {...layout}
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
            <Input placeholder="Nome" />
          </Form.Item>
          <Divider />
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Salvar
              </Button>
              <Link to="/Genre">
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
}

export default GenreCreate;
