import React from 'react';
import { ArrowLeftOutlined, BarsOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Divider, Space, Typography, Form, Input, Button, Spin, Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Head from '../../Components/Head';
import useFetch from '../../Hooks/useFetch';
import useMessage from '../../Hooks/useMessage';

const { Title } = Typography

const Genre = () => {
    const [edit, setEdit] = React.useState(false)
    type genreTypes = {
        id: number,
        name: string
    }
    const [genre, setGenre] = React.useState<genreTypes>()

    const [form] = Form.useForm();
    const {request, loading} = useFetch();
    const {id} = useParams();
    const {resultMessage, confirmMessage} = useMessage('/Genre');

    React.useEffect(()=>{
        async function fetchGenre(url:string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok){
                setGenre(json);
                form.setFieldsValue({ id: json.id });
                form.setFieldsValue({ name: json.name });
            }
            else
                console.error(error);
        }
        fetchGenre("https://localhost:5002/api/Genre/"+id);
    },[])

    function initState(){
        form.setFieldsValue({ name: genre ? genre.name : ""});
        setEdit(false);
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const onFinish = (values: any) => {
        confirmMessage(
            'edit',
            async function(){
                const { response, error } = await request("https://localhost:5002/api/Genre/"+id, "UPDATE", values)
                response.ok ? resultMessage('edit') : resultMessage('edit', error)
            }
        )
    };

    async function handleDelete(){
        confirmMessage(
            'delete',
            async function(){
                const { json, response, error } = await request("https://localhost:5002/api/Genre/"+id, "DELETE")
                if(response.ok){
                    setEdit(false)
                    json.result ? resultMessage('delete') : resultMessage('delete', json.msg)
                }
                else
                    resultMessage('delete', error ? error : null)
            }
        )
    }

    return (
        <>
        <Head title="Detalhes | Gêneros"/>
        <Card>
            <Space>
                <Title level={4}><BarsOutlined /></Title>
                <Title level={4}>Gênero</Title>
            </Space>
            <hr/>
            <Spin spinning={loading}>
                <Form {...layout} layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
                        <Input placeholder="Nome" disabled={!edit}/>
                    </Form.Item>
                    <Divider/>
                    <Row>
                        <Col span={2}>
                            <Button type="primary" style={!edit ? {display:"none"} : {display:"block"}} htmlType="submit" icon={<EditOutlined />}>
                                Salvar
                            </Button>
                            <Button type="default" style={edit ? {display:"none"} : {display:"block"}} htmlType="button" icon={<EditOutlined />} onClick={()=>setEdit(true)}>
                                Editar
                            </Button>
                        </Col>
                        <Col span={2}>
                            {edit ?
                                <Button htmlType="button" icon={<ArrowLeftOutlined />} onClick={initState}>
                                    Voltar
                                </Button> :
                                <Link to="/Genre">
                                    <Button htmlType="button" icon={<ArrowLeftOutlined />}>
                                        Voltar
                                    </Button>
                                </Link>
                            }

                        </Col>
                        <Col offset={18} span={2}>
                            <Button type="primary" danger htmlType="button" icon={<DeleteOutlined />} onClick={handleDelete}>
                                Excluir
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Card>
        </>
    )
}

export default Genre