using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Control
{
    public class ImageControl
    {
        private IWebHostEnvironment hostingEnvironment;
        public ImageControl(IWebHostEnvironment environment)
        {
            hostingEnvironment = environment;
        }

        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename)
        {
            if (string.IsNullOrWhiteSpace(this.hostingEnvironment.WebRootPath))
            {
                this.hostingEnvironment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            return this.hostingEnvironment.WebRootPath + "\\uploads\\" + filename;
        }
        public async Task<Object> SaveFile(IList<IFormFile> files)
        {
            try
            {
                foreach (IFormFile source in files)
                {
                    string filename = ContentDispositionHeaderValue.Parse(source.ContentDisposition).FileName.Trim('"');

                    filename = this.EnsureCorrectFilename(filename);

                    using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
                        await source.CopyToAsync(output);
                }

                return new
                {
                    operacao=true
                };
            }
            catch(Exception e)
            {
                return new
                {
                    operacao = false,
                    erro = e
                };
            }
        }

        public Boolean DeleteFile(string fileName){
            try
            {
                string path = this.GetPathAndFilename(fileName);
                System.IO.File.Delete(path);

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public FileStream GetFile(string fileName)
        {
            try
            {
                string path = this.GetPathAndFilename(fileName);
                FileStream output = System.IO.File.OpenRead(path);

                if (output == null)
                    throw new ArgumentException("Arquivo não encontrado");

                return output;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}