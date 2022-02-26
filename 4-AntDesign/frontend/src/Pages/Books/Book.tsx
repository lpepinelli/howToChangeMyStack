import { ArrowLeftOutlined, BookFilled, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Divider, Space, Typography, Form, Input, Button, Row, Col, Select, DatePicker, Upload } from 'antd';
import React from 'react';
import {MaskedInput} from 'antd-mask-input'
import Head from '../../Components/Head';
import useFetch from '../../Hooks/useFetch';
import useMessage from '../../Hooks/useMessage';
import { useParams, Link } from 'react-router-dom'
import moment from 'moment';

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
        async function fetchBook(url:string){
            const {response, json, error} = await request(url, "READ");
            if(response.ok){
                setBook(json);
                form.setFieldsValue({ id: json.id });
                form.setFieldsValue({ title: json.title });
                form.setFieldsValue({ author: json.author });
                form.setFieldsValue({ genre: json.genre.id });
                form.setFieldsValue({ isbn: json.isbn });
                setIsbnRaw(json.isbn);
                form.setFieldsValue({ publication: moment(json.publication) });
                let imgUrl: string = await getCover(json.id+"-"+json.cover);
                console.error("setFields")
                console.log(imgUrl);
                form.setFieldsValue({ cover: [{
                    uid: '-1',
                    name: json.cover,
                    status: 'done',
                    thumbUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABWCAYAAABVVmH3AAAAAXNSR0IArs4c6QAAASlJREFUeF7t1EENwDAMBMGETVQA5c+slYLB+xsD2Mfo5H2e91tuXGCDHTe9QbCNK9jIFSzYSiDq+rFgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eoa7FgI4Eo+wNtqoOxf2HTkwAAAABJRU5ErkJggg=="
                  }] });
            }
            else
                console.error(error);
        }
        fetchBook("https://localhost:5002/api/Book/"+id);
    },[])

    function imageToDataUri(img: string | ArrayBuffer | CanvasImageSource | null) {

        // create an off-screen canvas
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        // set its dimension to target size
        canvas.width = 86;
        canvas.height = 86;

        // draw source image into the off-screen canvas:
        if(img!=null)
            ctx!.drawImage(img as CanvasImageSource, 0, 0, 86, 86);

        // encode image to data-uri with base64 version of compressed image
        return canvas.toDataURL();
    }

    async function getCover(fileName:string) {
        const response = await fetch("https://localhost:5002/api/Book/GetImage", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(fileName)
        });

        if(response.ok){
            const blob = await response.blob();

            const reader = new FileReader();
            let Url = ""
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                let img = new Image();
                img.src = reader.result as string
                console.log(reader.result);
                Url = reader.result as string
            }
            return Url as string
            /*reader.addEventListener("load", function(){
                let img = new Image();
                img.src = this.result as string
                console.log(imageToDataUri(img))
                Url = imageToDataUri(img).toString();
                return Url
            });
            return reader.readAsDataURL(blob);*/
        }
        return ""
    }

    function initState(){
        form.setFieldsValue({ title: book ? book.title : "" });
        form.setFieldsValue({ author: book ? book.author : "" });
        form.setFieldsValue({ genre: book ? book.genre.id : 0 });
        form.setFieldsValue({ isbn: book ? book.isbn : "" });
        //form.setFieldsValue({ publication: book ? book.publication : "" });
        setEdit(false);
    }

    async function saveImage(bk_id:number, file: File){
        let formData = new FormData();
        let auxName="";

        auxName = bk_id+"-"+file.name;
        formData.append("files", file, auxName);

        const options= {
            method: "POST",
            body: formData,
            processData: false,
            contentType: false,
        }

        const {response, error} = await request("https://localhost:5002/api/Book/Image", "CREATE", null, options);
        response.ok ? resultMessage('save') : resultMessage('save', error)
    }

    const onFinish = (values: any) => {
        let file:File
        values.isbn = isbnRaw
        values.publication = values.publication.toDate()
        values.genre = {
            id: values.genre
        }
        if(values.cover){
            file = values.cover[0].originFileObj
            values.cover = values.cover[0].name
        }
        confirmMessage(
            'edit',
            async function(){
                const { response, error, json } = await request("https://localhost:5002/api/Book/"+id, "UPDATE", values)
                response.ok ? values.cover ? saveImage(json.id, file) : resultMessage('edit') : resultMessage('edit', error)
            }
        )
    };

    async function handleDelete(){
        confirmMessage(
            'delete',
            async function(){
                const { json, response, error } = await request("https://localhost:5002/api/Book/"+id, "DELETE")
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
                    <Form.Item name="id" hidden={true}>
                        <Input/>
                    </Form.Item>
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
                                customRequest={({ file, onSuccess }) => {
                                    setTimeout(() => {
                                      onSuccess ? onSuccess("ok") : null
                                    }, 0);
                                  }}
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
                                <Link to="/">
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
            </Card>
        </>
    )
}

export default Book