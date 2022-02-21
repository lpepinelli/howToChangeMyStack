import React from 'react';
import { ArrowLeftOutlined, BarsOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Divider, Space, Typography, Form, Input, Button, Modal, Skeleton, Spin, Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Head from '../../Components/Head';
import { useNavigate  } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

const {Title} = Typography
const { confirm, success} = Modal;

function Genre() {
    const [edit, setEdit] = React.useState(false)
    type genreTypes = {
        id: number,
        name: string
    }
    const [genre, setGenre] = React.useState<genreTypes>()
    type ResultState = {
        result: boolean,
        msg: string
    }
    const [resultDelete, setResultDelete] = React.useState<ResultState>();

    const [form] = Form.useForm();
    const {request, loading} = useFetch();
    const navigate = useNavigate();
    const {id} = useParams();

    React.useEffect(()=>{
        async function fetchGenre(url:string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok){
                setGenre(json);
                form.setFieldsValue({ name: json.name });
            }
            else
                console.error(error);
        }
        fetchGenre("https://localhost:5002/api/Genre/"+id);
    },[])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { span: 4 },
    };
    const deleteLayout = {
        wrapperCol: { offset: 4, span: 4 },
    };

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
            <Spin spinning={loading}>
                <Form {...layout} layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                        <Input placeholder="Nome" disabled={!edit}/>
                    </Form.Item>
                    <Divider/>
                        <Row>
                            <Col span={2}>
                                {edit ? <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                                    Salvar
                                </Button> :
                                <Button type="primary" htmlType="button" icon={<EditOutlined />} onClick={()=>setEdit(true)}>
                                    Editar
                                </Button>}
                            </Col>
                            <Col span={2}>
                                <Link to="/Genre"><Button htmlType="button" icon={<ArrowLeftOutlined />}>
                                        Voltar
                                    </Button></Link>
                            </Col>
                            <Col offset={18} span={2}>
                                <Button type="primary" danger htmlType="button" icon={<DeleteOutlined />}>
                                    Excluir
                                </Button>
                            </Col>
                        </Row>
                    <Form.Item>
                    </Form.Item>
                </Form>
            </Spin>

        </Card>
        </>
    )
}

export default Genre