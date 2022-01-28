import React from 'react'
import { Link } from 'react-router-dom';
import Head from '../Head'
import Title from '../Title'
import Input from '../Forms/Input'
import useForm from '../Hooks/useForm'
import useFetch from '../Hooks/useFetch'
import WarningAlert from '../Alerts/WarningAlert';
import ConfirmAlert from '../Alerts/ConfirmAlert';

function BookCreate() {
    const Name = useForm('Informe o Nome');
    const Title = useForm('Informe o Título');
    const Author = useForm('Informe o Autor');

    const {loading, request, error} = useFetch();

    async function handleClick(){
        if (Name.validate()) {
            var dados = {
                name: Name.value
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
                                                        <h4 className="form-section"><i className="icon-grid"></i>Gênero</h4>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Nome" required="true" type="text" placeholder="Nome" value={Name.value} setValue = {Name.setValue} onBlur={Name.onBlur} onChange={Name.onChange} error={Name.error}/>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h4 className="form-section"><i className="icon-books"></i>Livro</h4>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Título" required="true" type="text" placeholder="Titulo" value={Title.value} setValue = {Title.setValue} onBlur={Title.onBlur} onChange={Title.onChange} error={Title.error}/>
                                                    </div>
                                                    <div className="form-group col-sm-4">
                                                        <Input label="Autor" required="true" type="text" placeholder="Autor" value={Author.value} setValue = {Author.setValue} onBlur={Author.onBlur} onChange={Author.onChange} error={Author.error}/>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <label>Gênero <span className="text-danger">*</span></label>
                                                        <select className="form-control required" id="cbGenres">
                                                            {/**/}
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-sm-2">
                                                        <label>Data de Publicação <span className="text-danger">*</span></label>
                                                        <input id="publication" type="date" className="form-control required"/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-sm-4">
                                                        <label>ISBN</label>
                                                        <input type="text" className="form-control" id="isbn" placeholder="ISBN"/>
                                                        <input type="hidden" id="hiddenIsbn"/>
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
                                                    data-toggle="modal" data-target={Name.value==="" ? "":"#warning"} onClick={()=>Name.validate()}>
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