import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const validateMessages = {
  required: "Por favor, insira o campo '${label}'",
};

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR} form={{ validateMessages  }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
