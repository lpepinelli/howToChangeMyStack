import { ArrowLeftOutlined, BookFilled, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Divider, Space, Typography, Form, Input, Button, Row, Col, Select, DatePicker, Upload } from 'antd';
import React from 'react';
import {MaskedInput} from 'antd-mask-input'
import Head from '../../Components/Head';
import useFetch from '../../Hooks/useFetch';
import useMessage from '../../Hooks/useMessage';
import { useParams, Link } from 'react-router-dom'

const {Title} = Typography

const tailLayout = {
  wrapperCol: { span: 8 },
};

const Book = () => {


    const [edit, setEdit] = React.useState(false)
    type bookTypes = {
        id: number,
        title: string,
        author: string,
        cover: string,
        genre: {
            id: number,
            name?: string
        },
        isbn: string,
        publication: Date
    }
    const [book, setBook] = React.useState<bookTypes>()
    const [genres, setGenres] = React.useState()
    const [isbnRaw, setIsbnRaw] = React.useState("");
    const [form] = Form.useForm();
    const {request, loading} = useFetch();
    const {id} = useParams();
    const {resultMessage, confirmMessage} = useMessage('/');

    React.useEffect(()=>{
        async function fetchGenres(url: string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok)
                setGenres(json);
            else
                console.error(error);
        }
        fetchGenres("https://localhost:5002/api/Genre");
    },[])

    React.useEffect(()=>{
        async function fetchGenre(url:string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok){
                setBook(json);
                form.setFieldsValue({ id: json.id });
                form.setFieldsValue({ title: json.title });
                form.setFieldsValue({ author: json.author });
                form.setFieldsValue({ genre: json.genre.id });
                form.setFieldsValue({ isbn: json.isbn });
                form.setFieldsValue({ publication: json.publication });
            }
            else
                console.error(error);
        }
        fetchGenre("https://localhost:5002/api/Book/"+id);
    },[])

    function initState(){
        /*
        todo: initState
        */
        //form.setFieldsValue({ name: genre ? genre.name : ""});
        setEdit(false);
    }

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

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
        return e;
        }
        return e && e.fileList;
    };

    const normInptMask = (e: any) => {
        setIsbnRaw(e.target.value.replaceAll(new RegExp('-|_', 'g'),''))
    }

    return (
        <>
            <Head title="Detalhes | Livros"/>
            <Card>
                <Space>
                    <Title level={4}><BookFilled /></Title>
                    <Title level={4}>Livros</Title>
                </Space>
                <hr/>
                <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
                    <Row gutter={18}>
                        <Col span={8}>
                            <Form.Item name="title" label="Título" rules={[{ required: true }]}>
                                <Input placeholder="Título"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="author" label="Autor" rules={[{ required: true }]}>
                                <Input placeholder="Autor"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="genre" label="Gênero" rules={[{ required: true }]}>
                                <Select
                                placeholder="Selecione"
                                fieldNames={{
                                    label: 'name',
                                    value: 'id'
                                }}
                                options={genres}
                                >
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item name="publication" label="Data de Publicação" rules={[{ required: true }]}>
                                <DatePicker format={'DD/MM/YYYY'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item name="isbn" label="ISBN" getValueFromEvent={normInptMask}>
                                <MaskedInput mask="1-1111-1111-1" placeholder="ISBN"/>
                            </Form.Item>
                        </Col>
                        <Col span={8} offset={8}>
                            <Form.Item
                                name="cover"
                                label="Imagem"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                >
                            <Upload name="logo"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                maxCount={1}>
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Carregar</div>
                                </div>
                            </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider/>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                Salvar
                            </Button>
                            <Link to="/"><Button htmlType="button" icon={<ArrowLeftOutlined />}>
                                Voltar
                            </Button></Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default Book