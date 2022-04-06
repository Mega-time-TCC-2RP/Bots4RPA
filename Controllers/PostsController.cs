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
    [Authorize]
    public class PostsController : ControllerBase
    {
        // Vincular a Interface
        private readonly IPostRepository ctx;

        public PostsController(IPostRepository context)
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
            var post = ctx.SearchByID(id);

            if (post == null)
            {
                return NotFound(new { msg = "Não encontrado" });
            }

            return Ok(post);
        }

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1, 2, 3")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromForm] Post post, IFormFile File)
        {
            try
            {
                post.IdPost = id;

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

                var QueryPost = ctx.SearchByID(id);

                if (QueryPost == null)
                {
                    return NotFound();
                }

                post.IdPost = id;
                post.PostImage = UploadResult;

                Upload.RemoveFile(QueryPost.PostImage);
                #endregion

                ctx.Update(post);

                return NoContent();
            }

            catch (Exception error)

            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "1, 2, 3")]
        [HttpPost]
        public IActionResult Post([FromForm] Post post, IFormFile File)
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

                post.PostImage = UploadResult;
                #endregion

                ctx.Create(post);

                return Created("Post", post);
            }

            catch (Exception error)
            {
                BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [Authorize(Roles = "1, 2, 3")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var post = ctx.SearchByID(id);
                if (post == null)
                {
                    return NotFound(new { msg = "Post não encontrado ou deletado" });
                }

                Upload.RemoveFile(post.PostImage);
                ctx.Delete(post);

                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "1,2,3")]
        [HttpGet("Highlights")]
        public IActionResult GetHighlightedPosts()
        {
            try
            {
                return Ok(ctx.GetHighlightedPosts());
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "1,2,3")]
        [HttpGet("MyPosts")]
        public IActionResult GetMyPosts()
        {
            try
            {
                return Ok(ctx.GetByUser(Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)));
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}
