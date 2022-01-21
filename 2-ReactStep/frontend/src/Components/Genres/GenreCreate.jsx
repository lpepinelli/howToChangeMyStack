import React from 'react'
import { Link } from 'react-router-dom';
import Head from '../Head'
import Title from '../Title'
import Input from '../Forms/Input'
import useForm from '../Hooks/useForm'
import useFetch from '../Hooks/useFetch'
import WarningAlert from '../Alerts/WarningAlert';
import ConfirmAlert from '../Alerts/ConfirmAlert';

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
            <div class="content-body">
                <section id="basic-form-layouts">
                    <div class="row match-height">
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-body collapse in">
                                    <div class="card-block">
                                        <form class="form">
                                            <div class="form-body">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <h4 class="form-section"><i class="icon-grid"></i>Gênero</h4>
                                                    </div>
                                                    <div class="form-group col-sm-4">
                                                        <label>Nome <span class="text-danger">*</span></label>
                                                        <Input type="text" placeholder="Nome" value={Name.value} setValue = {Name.setValue} onBlur={Name.onBlur} onChange={Name.onChange} error={Name.error}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-actions">
                                                <button type="button" class="btn btn-success mr-1" id="btnSalvar"
                                                    data-toggle="modal" data-target={Name.value==="" ? "":"#warning"} onClick={()=>Name.validate()}>
                                                    <i class="icon-floppy-o"></i> Salvar
                                                </button>
                                                <Link to="/Genre"><button type="button" class="btn btn-secundary" id="btnVoltar">
                                                    <i class="icon-arrow-left4"></i> Voltar
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
            <WarningAlert onClick={handleClick}/>
            <ConfirmAlert redirect="/Genre"/>
        </>
    )
}

export default GenreCreate
