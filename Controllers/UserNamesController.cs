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
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserNamesController : ControllerBase
    {
        // Vincular a Context
        private readonly IUserNameRepository ctx;

        public UserNamesController(IUserNameRepository context)
        {
            ctx = context;
        }

        // Metodo GET - Listagem
        [HttpGet]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        [HttpGet("{id}")]
        public IActionResult SearchByID(int id)
        {
            var userName = ctx.SearchByID(id);

            if (userName == null)
            {
                return NotFound();
            }

            return Ok(userName);
        }

        // Metodo PUT - Atualizacao
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm] UserName user, IFormFile File)
        {
            try
            {
                user.IdUser = id;
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
                var QueryUser = ctx.SearchByID(id);
                user.PhotoUser = UploadResult;

                if(QueryUser == null)
                {
                    return NotFound();
                }
                else
                {
                    Upload.RemoveFile(QueryUser.PhotoUser);
                    ctx.Update(user);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // Metodo POST - Cadastro
        [HttpPost]
        public IActionResult Post([FromForm] UserName user, IFormFile File)
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


                user.PhotoUser = UploadResult;
                ctx.Create(user);

                return Ok(user);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var user = ctx.SearchByID(id);
                if (user == null)
                {
                    return NotFound();
                }
                Upload.RemoveFile(user.PhotoUser);
                ctx.Delete(user);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpGet("MyTrophiesAndSkins")]
        [Authorize(Roles = "1,2,3")]
        public IActionResult GetTrophiesAndSkins()
        {
            try
            {
                return Ok(ctx.GetSkinsAndTrophiesByUser(Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)));
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpGet("Validate/{idUser}")]
        [Authorize(Roles = "1,2,3")]
        public IActionResult ValidateUser(int idUser)
        {
            try
            {
                UserName QueryUser = ctx.SearchByID(idUser);
                if (QueryUser == null)
                {
                    return NotFound("Id do usuário inválido");
                }
                else
                {
                    ctx.ValidateUser(QueryUser);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}