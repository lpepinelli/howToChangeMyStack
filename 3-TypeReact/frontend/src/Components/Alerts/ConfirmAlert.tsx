import React from 'react'
import { useNavigate  } from 'react-router-dom';

type propsType = {
    redirect: string,
    result: boolean,
    msg?: string
}

const ConfirmAlert = ({redirect, result, msg}: propsType) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(redirect);
    }

    return (
        <div id="confirm" className="modal fade" style={{display: 'none'}}>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className={result ? "box-icon-confirm":"box-icon-danger"}>
                            <i className={result ? "icon-android-done":"icon-android-close"}></i>
                        </div>
                        <h4 className="modal-title">{result ? "Deu certo!" : "Erro!"}</h4>
                        <button type="button" className="close" data-dismiss="modal"
                            aria-hidden="true">×</button>
                    </div>
                    <div className="modal-body">
                        <p>
                            {result ? "Registro incluído com sucesso." : msg}
                        </p>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className={"btn "+ (result ? "btn-confirm":"btn-danger")} onClick={handleClick}
                            data-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmAlert
