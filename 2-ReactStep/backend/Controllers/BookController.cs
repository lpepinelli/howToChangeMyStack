using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private IWebHostEnvironment hostingEnvironment;
        public BookController(IWebHostEnvironment environment)
        {
            hostingEnvironment = environment;
        }

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

        [HttpPost]
        [Route("Image")]
        public async Task<IActionResult> PostImage(IList<IFormFile> files)
        {
            Control.ImageControl objImage = new Control.ImageControl(hostingEnvironment);
            await objImage.SaveFile(files);
            return Ok();
        }

        [HttpPut]
        [Route("Image")]
        public async Task<IActionResult> PutImage(string previousFile, IList<IFormFile> files)
        {
            Control.ImageControl objImage = new Control.ImageControl(hostingEnvironment);
            objImage.DeleteFile(previousFile);
            await objImage.SaveFile(files);
            return Ok();
        }

        [HttpPost]
        [Route("GetImage")]
        public IActionResult GetImage([FromBody] String fileName)
        {
            Control.ImageControl objImage = new Control.ImageControl(hostingEnvironment);
            return File(objImage.GetFile(fileName), "application/octet-stream");
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
