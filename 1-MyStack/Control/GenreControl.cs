using System;
using System.Collections.Generic;

namespace _1_MyStack.Control
{
    public class GenreControl
    {
        public List<Models.Genre> ListGenres()
        {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false);
            Models.Genre _context = new Models.Genre(_bd);
            try{
                _bd.Open();
                List<Models.Genre> list = new List<Models.Genre>();
                list = _context.ListGenres();
                _bd.Close();
                return list;
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                _bd.Close();
                return null;
            }
        }
        public Models.Genre Read(int id)
        {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false);
            Models.Genre Genre = new Models.Genre(_bd);
            try{
                _bd.Open();
                Genre = Genre.Read(id);
                _bd.Close();
                return Genre;
            }
            catch(Exception e){
                Console.WriteLine(e.Message);
                _bd.Close();
                return null;
            }
        }

        public bool Create(Models.Genre Genre) {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false, true);
            Models.Genre obj = new Models.Genre(_bd);
            try{
                _bd.Open();
                if(obj.Create(Genre)){
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
        public bool Update(Models.Genre Genre) {
            DAL.MySQLPersistence _bd = new DAL.MySQLPersistence(false, true);
            Models.Genre obj = new Models.Genre(_bd);
            try{
                _bd.Open();
                if(obj.Update(Genre)){
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
            Models.Genre obj = new Models.Genre(_bd);
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