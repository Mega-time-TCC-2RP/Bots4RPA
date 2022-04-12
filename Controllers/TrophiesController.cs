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
    public class TrophiesController : ControllerBase
    {
        // Vincular a Interface
        private readonly ITrophyRepository ctx;

        public TrophiesController(ITrophyRepository context)
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
        [Authorize(Roles = "1, 2, 3")]
        [HttpGet("{id}")]
        public IActionResult SearchByID(int id)
        {
            var trophy = ctx.SearchByID(id);

            if (trophy == null)
            {
                return NotFound(new { msg = "Não encontrado" });
            }

            return Ok(trophy);
        }

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm] Trophy trophy, IFormFile File)
        {
            try
            {
                trophy.IdTrophy = id;

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

                var QueryTrophy = ctx.SearchByID(id);

                if (QueryTrophy == null)
                {
                    return NotFound();
                }

                trophy.IdTrophy = id;
                trophy.TrophyImage = UploadResult;

                Upload.RemoveFile(QueryTrophy.TrophyImage);
                #endregion

                ctx.Update(trophy);

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
        public IActionResult Post([FromForm] Trophy trophy, IFormFile File)
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

                trophy.TrophyImage = UploadResult;
                #endregion

                ctx.Create(trophy);

                return Created("Troféu", trophy);
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
                var trophy = ctx.SearchByID(id);
                if (trophy == null)
                {
                    return NotFound(new { msg = "Troféu não encontrado ou deletado" });
                }

                Upload.RemoveFile(trophy.TrophyImage);
                ctx.Delete(trophy);

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
