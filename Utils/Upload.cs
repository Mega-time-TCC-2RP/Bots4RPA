using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Utils
{
    public static class Upload
    {
        public static string UploadFile(IFormFile file, string[] fileTypes)
        {
            try
            {
                var folder = Path.Combine("StaticFiles", "Images");
                var path = Path.Combine(Directory.GetCurrentDirectory(), folder);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    if (ValidateFileType(fileTypes, fileName))
                    {
                        var fileType = ReturnFileType(fileName);
                        var newName = $"{Guid.NewGuid()}.{fileType}";
                        var fullPath = Path.Combine(path, newName);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }

                        return newName;
                    }

                    return "Extensão não permitida";
                }
                return "";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        public static bool ValidateFileType(string[] fileTypes, string fileName)
        {
            string[] data = fileName.Split(".");
            string fileType = data[data.Length - 1];

            foreach (var item in fileTypes)
            {
                if (fileType == item)
                {
                    return true;
                }
            }
            return false;
        }

        public static void RemoveFile(string fileName)
        {
            var folder = Path.Combine("StaticFiles", "Images");
            var path = Path.Combine(Directory.GetCurrentDirectory(), folder);
            var fullPath = Path.Combine(path, fileName);

            File.Delete(fullPath);
        }

        public static string ReturnFileType(string fileName)
        {
            string[] data = fileName.Split(".");
            return data[data.Length - 1];
        }
    }
}
