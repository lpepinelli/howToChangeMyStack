using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace _1_MyStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        // GET: api/Book
        [HttpGet]
        public ActionResult<List<Models.Book>> GetBooks()
        {
            Control.BookControl objBook = new Control.BookControl();
            return objBook.ListBooks();
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public ActionResult<Models.Book> GetBook(int id)
        {
            Control.BookControl objBook = new Control.BookControl();
            var Book = objBook.Read(id);

            if (Book == null)
                return NotFound();

            return Book;
        }

        // PUT: api/Book/5
        [HttpPut("{id}")]
        public IActionResult PutBook(int id, Models.Book Book)
        {
            Control.BookControl objBook = new Control.BookControl();

            if (id != Book.id)
            {
                return BadRequest();
            }

            try
            {
                objBook.Update(Book);
            }
            catch (Exception e)
            {
                if (objBook.Read(id) == null)
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // POST: api/Book
        [HttpPost]
        public ActionResult<Models.Book> PostBook(Models.Book Book)
        {
            Control.BookControl objBook = new Control.BookControl();
            var cod = objBook.Create(Book);

            return CreatedAtAction(nameof(GetBook), new { id = cod }, Book);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            Control.BookControl objBook = new Control.BookControl();
            var Book = objBook.Read(id);
            string msg = null;
            bool result;
            if (Book == null)
                return NotFound();

            result = objBook.Delete(id, out msg);

            return Ok(new {result, msg});
        }
    }
}
