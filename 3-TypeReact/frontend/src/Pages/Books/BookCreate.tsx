import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../../Components/Head';
import Title from '../../Components/Title';
import Input from '../../Components/Forms/Input';
import useForm from '../../Components/Hooks/useForm';
import useFetch from '../../Components/Hooks/useFetch';
import WarningAlert from '../../Components/Alerts/WarningAlert';
import ConfirmAlert from '../../Components/Alerts/ConfirmAlert';
import Select from '../../Components/Forms/Select';
import NumberFormat from 'react-number-format';

function BookCreate() {
    const varTitle = useForm('Informe o Título');
    const varAuthor = useForm('Informe o Autor');
    const varDate = useForm('Informe a Data de Publicação');
    //const varISBN = useForm();

    const [select, setSelect] = React.useState("0");
    const [Genres, setGenres] = React.useState(null);
    const [ISBN, setISBN] = React.useState("");
    const [errorSelect, setErrorSelect] = React.useState("");
    const [errorForm, setErrorForm] = React.useState(true);

    const {loading, request, error} = useFetch();

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

    async function validSelect(value: string){
        if (value === "0") {
            setErrorSelect("Informe o Gênero.");
        return false;
        } else {
            setErrorSelect("");
        return true;
        }
    }

    function handleChange({ target }: React.ChangeEvent<HTMLInputElement>){
        if (errorSelect) validSelect(target.value);
        setSelect(target.value);
    }

    async function validForm(){
        varTitle.validate();
        varAuthor.validate();
        varDate.validate();
        validSelect(select);

        varTitle.validate() &&
        varAuthor.validate() &&
        varDate.validate() &&
        validSelect(select) ? setErrorForm(false) : setErrorForm(true);
    }

    const inpFile = React.useRef<HTMLInputElement>(null);
    const previewContainer = React.useRef<HTMLDivElement>(null);
    const previewImage = React.useRef<HTMLImageElement>(null);
    const previewDefaultText = React.useRef<HTMLSpanElement>(null);
    const [imgLoad, setImgLoad] = React.useState("");

    function handleChangeImg(target: HTMLInputElement){
        const file = target.files ? target.files[0]: null;

        if(file){
            const reader = new FileReader();

            previewDefaultText.current ? previewDefaultText.current.style.display = "none": null;
            previewImage.current ? previewImage.current.style.display = "block": null;

            reader.addEventListener("load", function(){
                previewImage.current!.setAttribute("src", this.result as string);
            });

            reader.readAsDataURL(file);
            setImgLoad(file.name);
        }
        else{
            inpFile.current ? inpFile.current.value = "" : null;
            previewDefaultText.current ? previewDefaultText.current.style.display = "": null;
            previewImage.current ? previewImage.current.style.display = "" : null;
            previewImage.current!.setAttribute("src", "");
            setImgLoad("");
        }
    }

    function resetImage(){
        inpFile.current ? inpFile.current.value = "" : null;
        previewDefaultText.current ? previewDefaultText.current.style.display = "" : null;
        previewImage.current ? previewImage.current.style.display = "" : null;
        previewImage.current!.setAttribute("src", "");
        setImgLoad("");
    }

    async function saveImage(bk_id:number){
        let formData = new FormData();
        let auxName="";

        auxName = bk_id+"-"+imgLoad;
        if(inpFile.current && inpFile.current.files)
            formData.append("files", inpFile.current.files[0], auxName);

        const options= {
            method: "POST",
            body: formData,
            processData: false,
            contentType: false,
        }

        const {response, json, error} = await request("https://localhost:5002/api/Book/Image", "CREATE", null, options);
        if(response.ok)
            console.log(json);
        else
            console.log(error);
    }

    async function handleClick(){
        if (varTitle.validate() && varAuthor.validate() && varDate.validate()) {
            var dados = {
                title: varTitle.value,
                author: varAuthor.value,
                cover: imgLoad,
                genre: {
                    id: select
                },
                isbn: ISBN,
                publication: varDate.value
            }
            const {response, json, error} = await request("https://localhost:5002/api/Book", "CREATE", dados);
            if(response.ok)
                saveImage(json.id);
            else
                console.log(error);
        }
    }

    return (
        <>
            <Head title="Cadastro | Livros"/>
            <Title>Cadastro de Livros</Title>
            <div className="content-body">
                <section id="basic-form-layouts">
                    <div className="row match-height">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body collapse in">
                                    <div className="card-block">
                                        <form className="form">
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h4 className="form-section"><i className="icon-books"></i>Livro</h4>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Título" required={true} type="text" placeholder="Titulo"
                                                        value={varTitle.value} setValue = {varTitle.setValue} onBlur={varTitle.onBlur}
                                                        onChange={varTitle.onChange} error={varTitle.error}/>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Autor" required={true} type="text" placeholder="Autor"
                                                        value={varAuthor.value} setValue = {varAuthor.setValue} onBlur={varAuthor.onBlur}
                                                        onChange={varAuthor.onChange} error={varAuthor.error}/>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <Select label="Gênero" required="true" value={select}
                                                         onChange={handleChange}
                                                         onBlur={()=> validSelect(select)} error={errorSelect} data={Genres}/>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <Input label="Data de Publicação" required={true} type="date"
                                                        value={varDate.value} setValue = {varDate.setValue} onBlur={varDate.onBlur}
                                                        onChange={varDate.onChange} error={varDate.error}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <label>ISBN</label>
                                                        <NumberFormat format="#-####-####-#" className="form-control" type="text"
                                                        placeholder="ISBN" value={ISBN}
                                                        onValueChange={(values)=> setISBN(values.value)} />
                                                    </div>
                                                    <div className="col-sm-4 offset-sm-4">
                                                        <label>Imagem</label>
                                                        <input type="file" className="form-control" name="inpFile" id="inpFile" ref={inpFile} onChange={({target}) => handleChangeImg(target)}/>
                                                        <div className="image-preview" id="imagePreview" ref={previewContainer}>
                                                            <img src="" alt="Preview" className="image-preview__image" ref={previewImage}/>
                                                            <span className="image-preview__default-text" ref={previewDefaultText}>Pré-Visualização</span>
                                                        </div>
                                                        <div id="remover" style={{marginTop: "4px"}}>
                                                            {imgLoad && <button type="button" onClick={resetImage} className="btn btn-danger btn-block">Remover</button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <button type="button" className="btn btn-success mr-1" id="btnSalvar"
                                                    data-toggle="modal" data-target={errorForm ? "":"#warning"} onClick={()=>validForm()}>
                                                    <i className="icon-floppy-o"></i> Salvar
                                                </button>
                                                <Link to="/"><button type="button" className="btn btn-secundary" id="btnVoltar">
                                                    <i className="icon-arrow-left4"></i> Voltar
                                                </button></Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <WarningAlert onClick={handleClick} typeOp="save"/>
            <ConfirmAlert redirect="/" result={false}/>
        </>
    )
}

export default BookCreate