using System;
using System.Collections.Generic;
using System.Data;

namespace backend.DAL
{
    public class GenreDAL
    {
        MySQLPersistence _bd;
        public GenreDAL(MySQLPersistence bdObj){
            _bd = bdObj;
        }
        public Models.Genre Read(int id)
        {
            Models.Genre Genre = null;

            string select = @"SELECT * FROM Genre where gr_id = @id";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@id", id);
            DataTable dt = _bd.GetData(select,ps);

            if (dt.Rows.Count == 1)
            {
                Genre = new Models.Genre();
                Genre.id = Convert.ToInt32(dt.Rows[0]["gr_id"]);
                Genre.name = Convert.ToString(dt.Rows[0]["name"]);
            }

            return Genre;
        }

        public bool Create(Models.Genre gen)
        {
            string sql = @"insert into Genre (name) values(@name);SELECT LAST_INSERT_ID();";


            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@name", gen.name);

            if (_bd.Execute(sql, ps) > 0)
            {
                gen.id = (int)_bd.LastId;
                return true;
            }

            return false;

        }
        public bool Update(Models.Genre gen)
        {
            string sql = "update Genre set name = @name where gr_id = @id";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@id", gen.id);
            ps.Add("@name", gen.name);
            _bd.Execute(sql, ps);

            return true;
        }
        public bool Delete(int id)
        {
            string sql = "delete from Genre where gr_id = @id";

            Dictionary<string, object> ps = new Dictionary<string, object>();
            ps.Add("@id", id);
            _bd.Execute(sql, ps);
            //if (_bd.Execute(sql, ps)>0)
            //    return true;
            //else
            //    return false;
            return true;
        }
        public List<Models.Genre> ListGenres()
        {
            try
            {
                List<Models.Genre> list = new List<Models.Genre>();

                string select = @"SELECT * FROM Genre";

                DataTable dt = _bd.GetData(select);

                foreach (DataRow row in dt.Rows)
                {
                    var gen = new Models.Genre
                    {
                        id = Convert.ToInt32(row["gr_id"]),
                        name = Convert.ToString(row["name"])
                    };
                    list.Add(gen);
                }

                return list;
            }
            catch (Exception e)
            {
                throw new Exception("Error listing Genres: " + e.Message);
            }
        }

    }
}
