import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Book from '../Pages/Books/Book';
import Books from '../Pages/Books/Books';
import BookCreate from '../Pages/Books/BookCreate';
import Genre from '../Pages/Genres/Genre';
import Genres from '../Pages/Genres/Genres';
import GenreCreate from '../Pages/Genres/GenreCreate';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Books/>}/>
                <Route path="Book/Details/:id" element={<Book/>}/>
                <Route path="Book/Create" element={<BookCreate/>}/>
                <Route path="Genre" element={<Genres/>}/>
                <Route path="Genre/Details/:id" element={<Genre/>}/>
                <Route path="Genre/Create" element={<GenreCreate/>}/>
            </Routes>
        </Router>
    )
}