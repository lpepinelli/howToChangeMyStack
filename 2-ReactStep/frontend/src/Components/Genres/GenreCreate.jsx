import React from 'react'
import Head from '../Head'
import Title from '../Title'
import Input from '../Forms/Input'
import useForm from '../Hooks/useForm'

function GenreCreate() {
    const Name = useForm();
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
                                                        <Input type="text" className="form-control" placeholder="Nome" value={Name.value} setValue = {Name.setValue} onBlur={Name.onBlur}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-actions">
                                                <button type="button" class="btn btn-success mr-1" id="btnSalvar"
                                                    data-toggle="modal">
                                                    <i class="icon-floppy-o"></i> Salvar
                                                </button>
                                                <button type="button" class="btn btn-secundary" id="btnVoltar">
                                                    <i class="icon-arrow-left4"></i> Voltar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GenreCreate
