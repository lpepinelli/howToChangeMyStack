import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';
import { useNavigate  } from 'react-router-dom';

const { confirm, success } = Modal;

const useMessage = (redirect:string) => {

    const navigate = useNavigate();

    type errorMessage=string | {
        message: string;
        errors: any;
    } | null

    function resultMessage(type:'save' | 'edit' | 'delete', error: errorMessage = null ){
        let verb;
        switch(type) {
            case 'save':
                verb='incluído'
                break;
            case 'edit':
                verb='alterado'
                break;
            case 'delete':
                verb='excluído'
                break;
        }
        if(!error)
            success({
                content: `Registro ${verb} com sucesso.`,
                onOk(){
                    navigate(redirect)
                }
            });
        else
            Modal.error({
                    content: 'Erro!:'+error,
                    onOk(){
                        navigate(redirect)
                    }
                });
    }

    function confirmMessage(type:'save' | 'edit' | 'delete', onOk: ModalFuncProps["onOk"], onCancel:ModalFuncProps["onCancel"] = ()=>{}){
        confirm({
            title: 'Atenção!',
            icon: <ExclamationCircleOutlined style={type=='delete' ? {color:'#ff4d4f'} : {color:''}} />,
            content: type == 'delete' ? 'Deseja excluir o registro ?' : 'Deseja salvar o registro ?',
            okText: 'Sim',
            onOk,
            onCancel
          });
    }
  return {
      resultMessage,
      confirmMessage
  }
}

export default useMessage