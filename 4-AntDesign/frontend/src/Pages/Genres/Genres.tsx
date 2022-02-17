import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

function Genres() {
    return (
        <>
            <Title level={3}>Consulta - Gêneros</Title>

            <div className="site-layout-content"><h1>Genres</h1></div>
        </>
    )
}

export default Genres