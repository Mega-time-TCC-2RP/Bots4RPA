using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    public class CommentsController : ControllerBase
    {
        // Vincular a Interface
        private readonly ICommentRepository ctx;

        public CommentsController(ICommentRepository context)
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
        [Authorize(Roles = "1,2,3")]
        [HttpGet("{id}")]
        public IActionResult SearchByID(int id)
        {
            var comment = ctx.SearchByID(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1,2,3")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Comment comment)
        {
            try
            {
                comment.IdComment = id;
                Comment UpdatedComment = ctx.Update(comment);
                if (UpdatedComment == null)
                {
                    return NotFound();
                }
                else return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "3")]
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            try
            {
                ctx.Create(comment);

                return Ok(comment);
            }
            catch (Exception error)
            {
                return BadRequest(error);
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
                var comment = ctx.SearchByID(id);
                if (comment == null)
                {
                    return NotFound();
                }
                else
                {
                    ctx.Delete(comment);
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
