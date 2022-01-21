import React from 'react'

const WarningAlert = ({onClick}) => {
    return (
            <div id="warning" className="modal fade" style={{display: 'none'}}>
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="box-icon-warning">
                                <i className="icon-alert"></i>
                            </div>
                            <h4 className="modal-title">Atenção!</h4>
                            <button type="button" className="close" data-dismiss="modal"
                                aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body">
                            <p id="MsgWarn">

                            </p>
                            <h3>Deseja salvar o registro ?</h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-confirm" data-toggle="modal" data-target="#confirm"
                                data-dismiss="modal" onClick={onClick}>Salvar</button>
                            <button type="button" className="btn btn-info"
                                data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default WarningAlert
