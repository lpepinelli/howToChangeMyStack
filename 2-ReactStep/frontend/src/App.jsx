import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Books from './Components/Books';
import Book from './Components/Book';
import Genres from './Components/Genres';

function App() {
  return <>
      <BrowserRouter>
        <Header />
          <div class="app-content content container-fluid">
              <div class="content-wrapper reset leftprint mt-4">
                  <Routes>
                    <Route path="/" element={<Books/>}/>
                    <Route path="Books/:id" element={<Book/>}/>
                    <Route path="Genre" element={<Genres/>}/>
                  </Routes>
                  <hr />
              </div>
          </div>
      </BrowserRouter>
    </>
}

export default App;
