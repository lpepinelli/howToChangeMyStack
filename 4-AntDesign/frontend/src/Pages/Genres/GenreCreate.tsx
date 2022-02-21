import React from 'react';
import { ArrowLeftOutlined, BarsOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Divider, Space, Typography, Form, Input, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Head from '../../Components/Head';
import { useNavigate  } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

const {Title} = Typography
const { confirm, success} = Modal;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { span: 8 },
  };

function GenreCreate() {

    type errorType=string|object

    const [form] = Form.useForm();
    const {request} = useFetch();
    const navigate = useNavigate();

    function resultMessage(error=null){
        if(!error)
            success({
                content: 'Registro incluído com sucesso.',
                onOk(){
                    navigate('/Genre')
                }
            });
        else
            Modal.error({
                    content: 'Erro!:'+error,
                    onOk(){
                        navigate('/Genre')
                    }
                });
    }

      const onFinish = (values: any) => {
        confirm({
            title: 'Atenção!',
            icon: <ExclamationCircleOutlined />,
            content: 'Deseja salvar o registro ?',
            onOk() {
                return request("https://localhost:5002/api/Genre", "CREATE", values)
                .catch((error) => resultMessage(error))
                .finally(() => resultMessage())
            },
            onCancel() {},
          });
      };

    return (
        <>
        <Head title="Cadastro | Gêneros"/>
        <Card>
            <Space>
                <Title level={4}><BarsOutlined /></Title>
                <Title level={4}>Gênero</Title>
            </Space>
            <hr/>
            <Form {...layout} layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                    <Input placeholder="Nome"/>
                </Form.Item>
                <Divider/>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Salvar
                        </Button>
                        <Link to="/Genre"><Button htmlType="button" icon={<ArrowLeftOutlined />}>
                            Voltar
                        </Button></Link>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
        </>
    )
}

export default GenreCreate