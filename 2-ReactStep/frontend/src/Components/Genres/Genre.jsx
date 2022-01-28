import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Head from '../Head'
import Title from '../Title'
import Input from '../Forms/Input'
import useForm from '../Hooks/useForm'
import useFetch from '../Hooks/useFetch'
import WarningAlert from '../Alerts/WarningAlert';
import ConfirmAlert from '../Alerts/ConfirmAlert';

const Genre = () => {
    const [edit, setEdit] = React.useState(false);
    const [genre, setGenre] = React.useState(null);
    const Name = useForm('Informe o Nome');
    const {loading, request, error} = useFetch();
    const {id} = useParams();

    React.useEffect(()=>{
        async function fetchGenres(url){
            const {response, json, error} = await request(url, "READ");
            if(response.ok){
                setGenre(json);
                Name.setValue(json.name);
            }
            else
                console.error(error);
        }
        fetchGenres("https://localhost:5002/api/Genre/"+id);
    },[])

    async function handleClick(){
        if (Name.validate()) {
            var dados = {
                id: id,
                name: Name.value
            }
            const {response, error} = await request("https://localhost:5002/api/Genre/"+id, "UPDATE", dados);
            if(response.ok)
                setEdit(false);
            else
                console.log(error);
        }
    }

    async function handleDelete(){
        const {response, error} = await request("https://localhost:5002/api/Genre/"+id, "DELETE");
        if(response.ok)
            setEdit(false);
        else
            console.log(error);
    }

    function initState(){
        Name.setValue(genre.name);
        Name.validate(Name.value);
        setEdit(false);
    }

    return (
        <>
            <Head title="Detalhes | Gênero"/>
            <Title>Alteração de Gêneros</Title>
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
                                                        <label>Nome <span className="text-danger">*</span></label>
                                                        <Input type="text" placeholder="Nome" value={Name.value} setValue = {Name.setValue} onBlur={Name.onBlur} onChange={Name.onChange} error={Name.error} disabled={!edit}/>
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
                                                    </button> : <Link to="/Genre"><button type="button" className="btn btn-secundary" id="btnVoltar">
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
            <ConfirmAlert redirect="/Genre"/>
        </>
    )
}

export default Genre
