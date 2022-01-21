import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Books from './Components/Books/Books';
import Book from './Components/Books/Book';
import Genres from './Components/Genres/Genres';
import Genre from './Components/Genres/Genre';
import GenreCreate from './Components/Genres/GenreCreate';
import BookCreate from './Components/Books/BookCreate';

function App() {
  return <>
      <BrowserRouter>
        <Header />
          <div class="app-content content container-fluid">
              <div class="content-wrapper reset leftprint mt-4">
                  <Routes>
                    <Route path="/" element={<Books/>}/>
                    <Route path="Book/Details/:id" element={<Book/>}/>
                    <Route path="Book/Create" element={<BookCreate/>}/>
                    <Route path="Genre" element={<Genres/>}/>
                    <Route path="Genre/Details/:id" element={<Genre/>}/>
                    <Route path="Genre/Create" element={<GenreCreate/>}/>
                  </Routes>
                  <hr />
              </div>
          </div>
      </BrowserRouter>
    </>
}

export default App;
