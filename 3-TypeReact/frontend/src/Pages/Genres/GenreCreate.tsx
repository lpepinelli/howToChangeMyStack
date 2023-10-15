import React from 'react'
import { Link } from 'react-router-dom';
import Head from '../../Components/Head'
import Title from '../../Components/Title'
import Input from '../../Components/Forms/Input'
import useForm from '../../Components/Hooks/useForm'
import useFetch from '../../Components/Hooks/useFetch'
import WarningAlert from '../../Components/Alerts/WarningAlert';
import ConfirmAlert from '../../Components/Alerts/ConfirmAlert';

function GenreCreate() {
    const Name = useForm('Informe o Nome');
    const {loading, request, error} = useFetch();

    async function handleClick(){
        if (Name.validate()) {
            var dados = {
                name: Name.value
            }
            const {response, error} = await request("https://localhost:5002/api/Genre", "CREATE", dados);
            if(!response.ok)
                console.log(error);
        }
    }

    return (
        <>
            <Head title="Cadastro | Gêneros"/>
            <Title>Cadastro de Gêneros</Title>
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
                                                        <Input type="text" placeholder="Nome" value={Name.value} setValue = {Name.setValue} onBlur={Name.onBlur} onChange={Name.onChange} error={Name.error}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <button type="button" className="btn btn-success mr-1" id="btnSalvar"
                                                    data-toggle="modal" data-target={Name.value==="" ? "":"#warning"} onClick={()=>Name.validate()}>
                                                    <i className="icon-floppy-o"></i> Salvar
                                                </button>
                                                <Link to="/Genre"><button type="button" className="btn btn-secundary" id="btnVoltar">
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
            <ConfirmAlert redirect="/Genre" result={false}/>
        </>
    )
}

export default GenreCreate
