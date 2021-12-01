using System;
using System.Collections.Generic;

namespace _1_MyStack.Control
{
    public class BookControl
    {
        public List<Models.Book> ListBooks()
        {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false);
            Models.Book _context = new Models.Book(_bd);
            try{
                _bd.Open();
                List<Models.Book> list = new List<Models.Book>();
                list = _context.ListBooks();
                _bd.Close();
                return list;
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                _bd.Close();
                return null;
            }
        }
        public Models.Book Read(int id)
        {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false);
            Models.Book Book = new Models.Book(_bd);
            try{
                _bd.Open();
                Book = Book.Read(id);
                _bd.Close();
                return Book;
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                _bd.Close();
                return null;
            }
        }

        public bool Create(Models.Book Book) {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false, true);
            Models.Book obj = new Models.Book(_bd);
            try{
                _bd.Open();
                if(obj.Create(Book)){
                    _bd.Commit();
                    _bd.Close();
                    return true;
                }
                else{
                    _bd.Close();
                    return false;
                }
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                _bd.Rollback();
                _bd.Close();
                return false;
            }
        }
        public bool Update(Models.Book Book) {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false, true);
            Models.Book obj = new Models.Book(_bd);
            try{
                _bd.Open();
                if(obj.Update(Book)){
                    _bd.Commit();
                    _bd.Close();
                    return true;
                }
                else{
                    _bd.Close();
                    return false;
                }
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                _bd.Rollback();
                _bd.Close();
                return false;
            }
        }
        public bool Delete(int id, out string msg) {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false, true);
            Models.Book obj = new Models.Book(_bd);
            msg = "Registro excluído com sucesso.";
            try{
                _bd.Open();
                if(obj.Delete(id)){
                    _bd.Commit();
                    _bd.Close();
                    return true;
                }
                else{
                    _bd.Close();
                    return false;
                }
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                msg = _bd.SqlExceptionHandle(e);
                _bd.Rollback();
                _bd.Close();
                return false;
            }
        }
    }
}