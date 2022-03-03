using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {

        // GET: api/Genre
        [HttpGet]
        public ActionResult<List<Models.Genre>> GetGenres()
        {
            Control.GenreControl objGenre = new Control.GenreControl();
            return objGenre.ListGenres();
        }

        // GET: api/Genre/5
        [HttpGet("{id}")]
        public ActionResult<Models.Genre> GetGenre(int id)
        {
            Control.GenreControl objGenre = new Control.GenreControl();
            var Genre = objGenre.Read(id);

            if (Genre == null)
                return NotFound();

            return Genre;
        }

        // PUT: api/Genre/5
        [HttpPut("{id}")]
        public IActionResult PutGenre(int id, Models.Genre Genre)
        {
            Control.GenreControl objGenre = new Control.GenreControl();

            if (id != Genre.id)
            {
                return BadRequest();
            }

            if (objGenre.Read(id) == null)
                return NotFound();

            try
            {
                objGenre.Update(Genre);
            }
            catch (Exception e)
            {
                    throw;
            }

            return NoContent();
        }

        // POST: api/Genre
        [HttpPost]
        public ActionResult<Models.Genre> PostGenre(Models.Genre Genre)
        {
            Control.GenreControl objGenre = new Control.GenreControl();
            var cod = objGenre.Create(Genre);

            return CreatedAtAction(nameof(GetGenre), new { id = cod }, Genre);
        }

        // DELETE: api/Genre/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGenre(int id)
        {
            Control.GenreControl objGenre = new Control.GenreControl();
            var Genre = objGenre.Read(id);
            string msg = null;
            bool result;
            if (Genre == null)
                return NotFound();

            result = objGenre.Delete(id, out msg);

            return Ok(new {result, msg});
        }
    }
}
