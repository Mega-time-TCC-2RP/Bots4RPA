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
    public class CorporationsController : ControllerBase
    {
        // Vincular a Context
        private readonly ICorporationRepository ctx;

        public CorporationsController(ICorporationRepository context)
        {
            ctx = context;
        }

        // Metodo GET - Listagem
        [HttpGet]
        [Authorize(Roles = "1")]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        [HttpGet("{id}")]
        [Authorize(Roles = "1, 2, 3")]
        public IActionResult SearchByID(int id)
        {
            var corporation = ctx.SearchByID(id);

            if (corporation == null)
            {
                return NotFound();
            }

            return Ok(corporation);
        }

        // Metodo PUT - Atualizacao
        [HttpPut("{id}")]
        [Authorize(Roles = "1, 2")]
        public IActionResult Update(int id, [FromForm] Corporation corporate, IFormFile File)
        {
            try
            {
                corporate.IdCorporation = id;

                if (File == null)
                    return BadRequest("É necessário enviar um arquivo de imagem válido!");

                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, FileTypes);
                if (UploadResult == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (UploadResult == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                var QueryCorporation = ctx.SearchByID(id);
                if (QueryCorporation == null)
                {
                    return NotFound();
                }
                corporate.IdCorporation = id;
                corporate.CorporatePhoto = UploadResult;
                Upload.RemoveFile(QueryCorporation.CorporatePhoto);
                ctx.Update(corporate);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [HttpPost]
        public IActionResult Post([FromForm] Corporation corporate, IFormFile File)
        {
            try
            {
                if (File == null)
                    return BadRequest("É necessário enviar um arquivo de imagem válido!");

                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, FileTypes);
                if (UploadResult == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (UploadResult == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                corporate.CorporatePhoto = UploadResult;
                ctx.Create(corporate);

                return Ok(corporate);
            }
            catch (Exception error)
            {
                BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [Authorize(Roles = "1, 2")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var corporate = ctx.SearchByID(id);
                if (corporate == null)
                {
                    return NotFound();
                }

                Upload.RemoveFile(corporate.CorporatePhoto);
                ctx.Delete(corporate);

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
