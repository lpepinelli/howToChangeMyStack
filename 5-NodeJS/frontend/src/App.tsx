import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { BarsOutlined, BookFilled } from '@ant-design/icons';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Books from './Pages/Books/Books';
import Book from './Pages/Books/Book';
import BookCreate from './Pages/Books/BookCreate';
import Genres from './Pages/Genres/Genres';
import Genre from './Pages/Genres/Genre';
import GenreCreate from './Pages/Genres/GenreCreate';

const { Header, Content, Footer } = Layout;

function App() {
  return (
  <>
    <Router>
      <Layout className="layout">
        <Header style={{ padding: '0 0 0 0' }}>
          <Menu mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="books" icon={<BookFilled />}><NavLink to="/">Livros</NavLink></Menu.Item>
            <Menu.Item key="genres" icon={<BarsOutlined />}><NavLink to="/Genre">Gêneros</NavLink></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '10px 30px', minHeight: '100%'}}>
          <Routes>
                <Route path="/" element={<Books/>}/>
                <Route path="Book/Details/:id" element={<Book/>}/>
                <Route path="Book/Create" element={<BookCreate/>}/>
                <Route path="Genre" element={<Genres/>}/>
                <Route path="Genre/Details/:id" element={<Genre/>}/>
                <Route path="Genre/Create" element={<GenreCreate/>}/>
            </Routes>
        </Content>
        <Footer></Footer>
      </Layout>
    </Router>
  </>
  )
}

export default App
