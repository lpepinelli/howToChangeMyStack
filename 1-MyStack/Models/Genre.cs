
using System.Collections.Generic;

namespace _1_MyStack.Models
{
    public class Genre
    {
        private readonly DAL.GenreDAL _context;
        public int id { get; set; }
        public string name { get; set; }
        public Genre(DAL.MySQLPersistence obj = null){
            _context = new DAL.GenreDAL(obj);
        }
        public Genre(){

        }

        public List<Genre> ListGenres()
        {
            return _context.ListGenres();
        }
        public Genre Read(int id)
        {
            return _context.Read(id);
        }
        public bool Create(Genre marc){
            return _context.Create(marc);
        }
        public bool Update (Genre marc){
            return _context.Update(marc);
        }
        public bool Delete (int id){
            return _context.Delete(id);
        }
    }
}