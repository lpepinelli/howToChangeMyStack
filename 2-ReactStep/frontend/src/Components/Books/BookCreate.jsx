import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../Head';
import Title from '../Title';
import Input from '../Forms/Input';
import useForm from '../Hooks/useForm';
import useFetch from '../Hooks/useFetch';
import WarningAlert from '../Alerts/WarningAlert';
import ConfirmAlert from '../Alerts/ConfirmAlert';

function BookCreate() {
    const varTitle = useForm('Informe o Título');
    const varAuthor = useForm('Informe o Autor');
    const varDate = useForm('Informe a Data de Publicação');
    const varISBN = useForm();

    const [select, setSelect] = React.useState("0");
    const [Genres, setGenres] = React.useState(null);

    const {loading, request, error} = useFetch();

    React.useEffect(()=>{
        async function fetchBooks(url){
            const {response, json, error} = await request(url, "READ");
            if(response.ok)
                setGenres(json);
            else
                console.error(error);
        }
        fetchBooks("https://localhost:5002/api/Genre");
    },[])

    async function handleClick(){
        if (varTitle.validate() && varAuthor.validate() && varDate.validate()) {
            var dados = {
                name: varTitle.value
            }
            const {response, error} = await request("https://localhost:5002/api/Book", "CREATE", dados);
            if(!response.ok)
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
                                                        <Input label="Título" required="true" type="text" placeholder="Titulo"
                                                        value={varTitle.value} setValue = {varTitle.setValue} onBlur={varTitle.onBlur}
                                                        onChange={varTitle.onChange} error={varTitle.error}/>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Autor" required="true" type="text" placeholder="Autor"
                                                        value={varAuthor.value} setValue = {varAuthor.setValue} onBlur={varAuthor.onBlur}
                                                        onChange={varAuthor.onChange} error={varAuthor.error}/>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <label>Gênero <span className="text-danger">*</span></label>
                                                        <select value={select} onChange={({target}) => setSelect(target.value)} className="form-control required" id="cbGenres">
                                                            <option disabled value="0">Selecione</option>
                                                            {Genres && Genres.map((val) => {
                                                                return <option key={val.id} value={val.id}>{val.name}</option>;
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <Input label="Data de Publicação" required="true" type="date"
                                                        value={varDate.value} setValue = {varDate.setValue} onBlur={varDate.onBlur}
                                                        onChange={varDate.onChange} error={varDate.error}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <Input label="ISBN" type="text" placeholder="ISBN"
                                                        value={varISBN.value} setValue = {varISBN.setValue}/>
                                                    </div>
                                                    <div className="col-sm-4 offset-sm-4">
                                                        <label>Imagem</label>
                                                        <input type="file" className="form-control" name="inpFile" id="inpFile"/>
                                                        <div className="image-preview" id="imagePreview">
                                                            <img src="" alt="Preview" className="image-preview__image"/>
                                                            <span className="image-preview__default-text">Pré-Visualização</span>
                                                        </div>
                                                        <div id="remover" style={{marginTop: "4px"}}>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <button type="button" className="btn btn-success mr-1" id="btnSalvar"
                                                    data-toggle="modal" data-target={varTitle.value==="" ? "":"#warning"} onClick={()=>varTitle.validate()}>
                                                    <i className="icon-floppy-o"></i> Salvar
                                                </button>
                                                <Link to="/Book"><button type="button" className="btn btn-secundary" id="btnVoltar">
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
            <WarningAlert onClick={handleClick} type="save"/>
            <ConfirmAlert redirect="/Book"/>
        </>
    )
}

export default BookCreate