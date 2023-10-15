import React from 'react'

const WarningAlert = ({onClick, type}) => {
    return (
            <div id="warning" className="modal fade" style={{display: 'none'}}>
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className={type === 'save' ? "box-icon-warning": "box-icon-danger"}>
                                <i className="icon-alert"></i>
                            </div>
                            <h4 className="modal-title">Atenção!</h4>
                            <button type="button" className="close" data-dismiss="modal"
                                aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <p id="MsgWarn">

                            </p>
                            <h3>{type === 'save' ? "Deseja salvar o registro ?": "Deseja excluir o registro ?"}</h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={"btn "+(type === 'save' ? "btn-confirm":"btn-danger")} data-toggle="modal" data-target="#confirm"
                                data-dismiss="modal" onClick={onClick}>{type === 'save' ? "Salvar" : "Excluir"}</button>
                            <button type="button" className="btn btn-info"
                                data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default WarningAlert
