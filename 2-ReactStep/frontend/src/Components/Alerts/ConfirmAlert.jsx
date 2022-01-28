import React from 'react'
import { Link } from 'react-router-dom';

const ConfirmAlert = ({redirect}) => {
    return (
        <div id="confirm" className="modal fade" style={{display: 'none'}}>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="box-icon-confirm">
                            <i className="icon-android-done"></i>
                        </div>
                        <h4 className="modal-title">Deu certo !</h4>
                        <button type="button" className="close" data-dismiss="modal"
                            aria-hidden="true">×</button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Registro incluído com sucesso.
                        </p>
                    </div>
                    <div className="modal-footer">
                    <Link to={redirect}><button type="button" className="btn btn-confirm"
                            data-dismiss="modal">Ok</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmAlert
