import React from 'react';
import { useParams, Link } from 'react-router-dom'
import Head from '../Head';
import Title from '../Title';
import Input from '../Forms/Input';
import useForm from '../Hooks/useForm';
import useFetch from '../Hooks/useFetch';
import WarningAlert from '../Alerts/WarningAlert';
import ConfirmAlert from '../Alerts/ConfirmAlert';
import Select from '../Forms/Select';
import NumberFormat from 'react-number-format';

function BookCreate() {
    const varTitle = useForm('Informe o Título');
    const varAuthor = useForm('Informe o Autor');
    const varDate = useForm('Informe a Data de Publicação');
    //const varISBN = useForm();

    const [select, setSelect] = React.useState("0");
    const [Genres, setGenres] = React.useState(null);
    const [ISBN, setISBN] = React.useState("");
    const [errorSelect, setErrorSelect] = React.useState(null);
    const [errorForm, setErrorForm] = React.useState(true);
    const [edit, setEdit] = React.useState(false);
    const [book, setBook] = React.useState(null);

    const {loading, request, error} = useFetch();
    const {id} = useParams();

    React.useEffect(()=>{
        async function fetchGenres(url){
            const {response, json, error} = await request(url, "READ");
            if(response.ok)
                setGenres(json);
            else
                console.error(error);
        }
        fetchGenres("https://localhost:5002/api/Genre");
    },[])

    React.useEffect(()=>{
        async function fetchBook(url){
            const {response, json, error} = await request(url, "READ");
            if(response.ok){
                setBook(json);
                varTitle.setValue(json.title);
                varAuthor.setValue(json.author);
                varDate.setValue(json.publication.substring(0,10));
                setSelect(json.genre.id);
                setISBN(json.isbn);
                setImgLoad(json.cover);
                const res = await getCover(json.id+"-"+json.cover);
            }
            else
                console.error(error);
        }
        fetchBook("https://localhost:5002/api/Book/"+id);
    },[])

    async function getCover(fileName) {
        const response = await fetch("https://localhost:5002/api/Book/GetImage", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(fileName)
        });

        if(response.ok){
            const file = await response.blob();

            const reader = new FileReader();
            previewDefaultText.current.style.display = "none";
            previewImage.current.style.display = "block";
            reader.addEventListener("load", function(){
                previewImage.current.setAttribute("src", this.result);
            });
            reader.readAsDataURL(file);
        }
    }

    async function initState(){
        varTitle.setValue(book.title);
        varAuthor.setValue(book.author);
        varDate.setValue(book.publication);
        setSelect(book.genre.id);
        setISBN(book.isbn);
        const res = await getCover(book.id+"-"+book.cover);
        varTitle.validate();
        varAuthor.validate();
        varDate.validate();
        validSelect(select);
        setEdit(false); /*copy this to use effect*/
    }

    async function validSelect(value){
        if (value === "0") {
            setErrorSelect("Informe o Gênero.");
        return false;
        } else {
            setErrorSelect(null);
        return true;
        }
    }

    function handleChange({ target }){
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

    const inpFile = React.useRef(null);
    const previewContainer = React.useRef(null);
    const previewImage = React.useRef(null);
    const previewDefaultText = React.useRef(null);
    const [imgLoad, setImgLoad] = React.useState("");

    function handleChangeImg(target){
        const file = target.files[0];

        if(file){
            const reader = new FileReader();

            previewDefaultText.current.style.display = "none";
            previewImage.current.style.display = "block";

            reader.addEventListener("load", function(){
                previewImage.current.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);
        }
        else{
            inpFile.current.value = "";
            previewDefaultText.current.style.display = null;
            previewImage.current.style.display = null;
            previewImage.current.setAttribute("src", "");
            setImgLoad("");
        }
        setImgLoad(file.name);
    }

    function resetImage(){
        inpFile.current.value = "";
        previewDefaultText.current.style.display = null;
        previewImage.current.style.display = null;
        previewImage.current.setAttribute("src", "");
        setImgLoad("");
    }

    async function updateImage(bk_id, previousImage){
        let formData = new FormData();
        let auxName="";

        auxName = bk_id+"-"+imgLoad;
        formData.append("files", inpFile.current.files[0], auxName);

        const options= {
            method: "PUT",
            body: formData,
            processData: false,
            contentType: false,
        }

        const {response, json, error} = await request("https://localhost:5002/api/Book/Image?previousFile="+bk_id+"-"+previousImage, "CREATE", null, options);
        if(response.ok)
            console.log(json);
        else
            console.log(error);
    }

    async function handleClick(){
        if (validForm()) {
            let previousImage = book.cover;
            var dados = {
                id: id,
                title: varTitle.value,
                author: varAuthor.value,
                cover: imgLoad,
                genre: {
                    id: select
                },
                isbn: ISBN,
                publication: varDate.value
            }
            const {response, error} = await request("https://localhost:5002/api/Book/"+id, "UPDATE", dados);
            if(response.ok){
                if(previousImage!==dados.cover)
                    updateImage(dados.id, previousImage);
                setEdit(false);
            }
            else
                console.log(error);
        }
    }

    async function handleDelete(){
        const {response, error} = await request("https://localhost:5002/api/Book/"+id, "DELETE");
        if(response.ok)
            setEdit(false);
        else
            console.log(error);
    }

    function dateToDateInput(date){
        let mesAtual = (date.getMonth() + 1).toString().padStart(2, '0');
        let diaAtual = (date.getDate()).toString().padStart(2, '0');
        return date.getFullYear() + "-" + mesAtual + "-" + diaAtual;
    }

    return (
        <>
            <Head title="Detalhes | Livros"/>
            <Title>Alteração de Livros</Title>
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
                                                        <Input label="Título" required="true" type="text" placeholder="Titulo"
                                                        value={varTitle.value} setValue = {varTitle.setValue} onBlur={varTitle.onBlur}
                                                        onChange={varTitle.onChange} error={varTitle.error} disabled={!edit}/>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Autor" required="true" type="text" placeholder="Autor"
                                                        value={varAuthor.value} setValue = {varAuthor.setValue} onBlur={varAuthor.onBlur}
                                                        onChange={varAuthor.onChange} error={varAuthor.error} disabled={!edit}/>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <Select label="Gênero" required="true" value={select}
                                                         onChange={handleChange}
                                                         onBlur={()=> validSelect(select)} error={errorSelect} data={Genres} disabled={!edit}/>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <Input label="Data de Publicação" required="true" type="date"
                                                        value={varDate.value} setValue = {varDate.setValue} onBlur={varDate.onBlur}
                                                        onChange={varDate.onChange} error={varDate.error} disabled={!edit}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <label>ISBN</label>
                                                        <NumberFormat format="#-####-####-#" className="form-control" type="text"
                                                        placeholder="ISBN" value={ISBN}
                                                        onValueChange={(values)=> setISBN(values.value)} disabled={!edit}/>
                                                    </div>
                                                    <div className="col-sm-4 offset-sm-4">
                                                        <label>Imagem</label>
                                                        <input type="file" className="form-control" name="inpFile" id="inpFile" ref={inpFile} onChange={({target}) => handleChangeImg(target)} disabled={!edit}/>
                                                        <div className="image-preview" id="imagePreview" ref={previewContainer}>
                                                            <img src="" alt="Preview" className="image-preview__image" ref={previewImage}/>
                                                            <span className="image-preview__default-text" ref={previewDefaultText}>Pré-Visualização</span>
                                                        </div>
                                                        <div id="remover" style={{marginTop: "4px"}}>
                                                            {imgLoad && <button type="button" onClick={resetImage} class="btn btn-danger btn-block" disabled={!edit}>Remover</button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <div className="col-sm-3">
                                                    {edit ? <button type="button" className="btn btn-success mr-1" onClick={handleClick}>
                                                        <i className="icon-floppy-o"></i> Salvar
                                                    </button> : <button type="button" className="btn btn-info mr-1" onClick={()=>setEdit(true)}>
                                                        <i className="icon-pencil2"></i> Editar
                                                    </button>}
                                                    {edit ? <button type="button" className="btn btn-secundary" onClick={initState}>
                                                        <i className="icon-arrow-left4"></i> Voltar
                                                    </button> : <Link to="/"><button type="button" className="btn btn-secundary" id="btnVoltar">
                                                        <i className="icon-arrow-left4"></i> Voltar
                                                    </button></Link>}
                                                </div>
                                                <div className="col-sm-1 offset-sm-8 pl-0">
                                                    <button type="button" className="btn btn-danger" id="btnExcluir" data-toggle="modal"
                                                        data-target="#warning">
                                                        <i className="icon-trash"></i> Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <WarningAlert onClick={handleDelete} type="delete"/>
            <ConfirmAlert redirect="/"/>
        </>
    )
}

export default BookCreate