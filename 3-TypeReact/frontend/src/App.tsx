import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Books from './Pages/Books/Books';
import Book from './Pages/Books/Book';
import BookCreate from './Pages/Books/BookCreate';
import Genres from './Pages/Genres/Genres';
import Genre from './Pages/Genres/Genre';
import GenreCreate from './Pages/Genres/GenreCreate';
import Header from "./Components/Header";


function App() {

  return (
    <>
      <Router>
        <Header />
          <div className="app-content content container-fluid">
          <div className="content-wrapper reset leftprint mt-4">
            <Routes>
                <Route path="/" element={<Books/>}/>
                <Route path="Book/Details/:id" element={<Book/>}/>
                <Route path="Book/Create" element={<BookCreate/>}/>
                <Route path="Genre" element={<Genres/>}/>
                <Route path="Genre/Details/:id" element={<Genre/>}/>
                <Route path="Genre/Create" element={<GenreCreate/>}/>
            </Routes>
          </div>
          <hr />
        </div>
      </Router>
    </>
    )
}

export default App
