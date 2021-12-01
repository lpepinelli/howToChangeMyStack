using System;
using System.Collections.Generic;
using System.Data;

namespace _1_MyStack.DAL
{
    public class BookDAL
    {
        MySQLPersistence _bd;
        public BookDAL(MySQLPersistence bdObj){
            _bd = bdObj;
        }
        public Models.Book Read(int id)
        {
            Models.Book Book = null;

            string select = @"SELECT * FROM Book
                            inner join Genre on Book.gr_id = Genre.gr_id
                            where bk_id = @id";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@id", id);
            DataTable dt = _bd.GetData(select,ps);

            if (dt.Rows.Count == 1)
            {
                Book = new Models.Book();
                Book.id = Convert.ToInt32(dt.Rows[0]["bk_id"]);
                Book.title = Convert.ToString(dt.Rows[0]["title"]);
                Book.author = Convert.ToString(dt.Rows[0]["author"]);
                Book.cover = Convert.ToString(dt.Rows[0]["cover"]);
                Book.genre = new Models.Genre { id = Convert.ToInt32(dt.Rows[0]["gr_id"]), name = Convert.ToString(dt.Rows[0]["name"])};
                Book.isbn = Convert.ToString(dt.Rows[0]["isbn"]);
                Book.publication = Convert.ToDateTime(dt.Rows[0]["publication"]);
            }
            return Book;
        }

        public bool Create(Models.Book book)
        {
            string sql = @"insert into Book (title, author, cover, gr_id, isbn, publication) values(@title, @author, @cover, @genre, @isbn, @publ);SELECT LAST_INSERT_ID();";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@title", book.title);
            ps.Add("@author", book.author);
            ps.Add("@cover", book.cover);
            ps.Add("@genre", book.genre.id);
            ps.Add("@isbn", book.isbn);
            ps.Add("@publ", book.publication);

            if (_bd.Execute(sql, ps) > 0)
            {
                book.id = (int)_bd.LastId;
                return true;
            }

            return false;
        }
        public bool Update(Models.Book book)
        {
            string sql = @"update Book set title = @title,
                            author = @author, cover = @cover,
                            gr_id = @genre, isbn = @isbn, publication = @publ where bk_id = @id";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@id", book.id);
            ps.Add("@title", book.title);
            ps.Add("@author", book.author);
            ps.Add("@cover", book.cover);
            ps.Add("@genre", book.genre.id);
            ps.Add("@isbn", book.isbn);
            ps.Add("@publ", book.publication);
            _bd.Execute(sql, ps);

            return true;
        }
        public bool Delete(int id)
        {
            string sql = "delete from Book where bk_id = @id";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@id", id);
            _bd.Execute(sql, ps);
            //if (_bd.Execute(sql, ps)>0)
            //    return true;
            //else
            //    return false;
            return true;
        }
        public List<Models.Book> ListBooks()
        {
            try
            {
                List<Models.Book> list = new List<Models.Book>();

                string select = @"SELECT * FROM Book
                                inner join Genre on Book.gr_id = Genre.gr_id";

                DataTable dt = _bd.GetData(select);

                foreach (DataRow row in dt.Rows)
                {
                    var book = new Models.Book
                    {
                        id = Convert.ToInt32(row["bk_id"]),
                        title = Convert.ToString(row["title"]),
                        author = Convert.ToString(row["author"]),
                        cover = Convert.ToString(row["cover"]),
                        genre = new Models.Genre { id = Convert.ToInt32(row["gr_id"]), name = Convert.ToString(row["name"])},
                        isbn = Convert.ToString(row["isbn"]),
                        publication = Convert.ToDateTime(row["publication"])
                    };
                    list.Add(book);
                }

                return list;
            }
            catch (Exception e)
            {
                throw new Exception("Error listing Books: " + e.Message);
            }
        }

    }
}
