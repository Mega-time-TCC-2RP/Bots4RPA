using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize]
    public class SkinsController : ControllerBase
    {
        // Vincular a Interface
        private readonly ISkinRepository ctx;

        public SkinsController(ISkinRepository context)
        {
            ctx = context;
        }

        // Metodo GET - Listagem
        [Authorize(Roles = "1, 2, 3")]
        [HttpGet]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        //[Authorize(Roles = "1, 2, 3")]
        //[HttpGet("{id}")]
        //public IActionResult SearchByID(int id)
        //{
        //    var skin = ctx.SearchByID(id);

        //    if (skin == null)
        //    {
        //        return NotFound(new { msg = "Não encontrado" });
        //    }

        //    return Ok(skin);
        //}

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm] Skin skin, IFormFile File)
        {
            try
            {
                skin.IdSkin = id;

                #region Upload da Imagem com extensões permitidas apenas
                if (File == null)
                    return BadRequest("É necessário enviar um arquivo de imagem válido!");

                string[] AllowedExtensions = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, AllowedExtensions);

                if (UploadResult == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (UploadResult == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                var QuerySkin = ctx.SearchByID(id);

                if (QuerySkin == null)
                {
                    return NotFound();
                }

                skin.IdSkin = id;
                skin.SkinImages = UploadResult;

                Upload.RemoveFile(QuerySkin.SkinImages);
                #endregion

                ctx.Update(skin);

                return NoContent();
            }

            catch (Exception error)

            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post([FromForm] Skin skin, IFormFile File)
        {
            try
            {
                #region Upload da Imagem com extensões permitidas apenas
                if (File == null)
                    return BadRequest("É necessário enviar um arquivo de imagem válido!");

                string[] AllowedExtensions = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, AllowedExtensions);

                if (UploadResult == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (UploadResult == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                skin.SkinImages = UploadResult;
                #endregion

                ctx.Create(skin);

                return Created("Skin", skin);
            }

            catch (Exception error)
            {
                BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var skin = ctx.SearchByID(id);
                if (skin == null)
                {
                    return NotFound(new { msg = "Skin não encontrada ou deletada" });
                }

                Upload.RemoveFile(skin.SkinImages);
                ctx.Delete(skin);

                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}
