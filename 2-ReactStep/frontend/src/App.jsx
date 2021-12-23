import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Books from './Components/Books/Books';
import Book from './Components/Books/Book';
import Genres from './Components/Genres/Genres';
import Genre from './Components/Genres/Genre';
import GenreCreate from './Components/Genres/GenreCreate';

function App() {
  return <>
      <BrowserRouter>
        <Header />
          <div class="app-content content container-fluid">
              <div class="content-wrapper reset leftprint mt-4">
                  <Routes>
                    <Route path="/" element={<Books/>}/>
                    <Route path="Book/Details/:id" element={<Book/>}/>
                    <Route path="Book/Create" element={<GenreCreate/>}/>
                    <Route path="Genre" element={<Genres/>}/>
                    <Route path="Genre/Create" element={<GenreCreate/>}/>
                    <Route path="Genre/Details/:id" element={<Genre/>}/>
                  </Routes>
                  <hr />
              </div>
          </div>
      </BrowserRouter>
    </>
}

export default App;
