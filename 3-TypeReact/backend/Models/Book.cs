
using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Book
    {
        private readonly DAL.BookDAL _context;
        public int id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string cover { get; set; }
        public Genre genre { get; set; }
        public string isbn { get; set; }
        public DateTime publication { get; set; }

        public Book(DAL.MySQLPersistence obj = null){
            _context = new DAL.BookDAL(obj);
        }
        public Book(){

        }
        public List<Book> ListBooks()
        {
            return _context.ListBooks();
        }
        public Book Read(int id)
        {
            return _context.Read(id);
        }
        public bool Create(Book marc){
            return _context.Create(marc);
        }
        public bool Update (Book marc){
            return _context.Update(marc);
        }
        public bool Delete (int id){
            return _context.Delete(id);
        }
    }
}