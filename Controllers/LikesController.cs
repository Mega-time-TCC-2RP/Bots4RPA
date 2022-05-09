using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
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
    public class LikesController : ControllerBase
    {
        // Vincular a Context
        private readonly ILikeRepository ctx;
        private readonly IEmployeeRepository Ectx;
        private readonly IPostRepository Pctx;

        public LikesController(ILikeRepository context, IEmployeeRepository Econtext, IPostRepository Pcontext)
        {
            ctx = context;
            Ectx = Econtext;
            Pctx = Pcontext;
        }

        // Metodo GET - Listagem
        //[Authorize(Roles = "1, 2, 3")]
        //[HttpGet]
        //public IActionResult ReadAll()
        //{
        //    return Ok(ctx.ReadAll());
        //}

        // Metodo GET por ID - Procurar pela ID
        //[Authorize(Roles = "1, 2, 3")]
        //[HttpGet("{id}")]
        //public IActionResult SearchByID(int id)
        //{
        //    try
        //    {
        //        var libraryTrophy = ctx.SearchByID(id);

        //        if (libraryTrophy == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(libraryTrophy);
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}

        // Metodo PUT - Atualizacao


        //[Authorize(Roles = "1, 2, 3")]
        //[HttpPut("{id}")]
        //public IActionResult Update(int id, Like like)
        //{
        //    try
        //    {
        //        Like QueryLike = ctx.SearchByID(id);
        //        like.IdLikes = id;
        //        if (QueryLike == null)
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            ctx.Update(like);
        //            return NoContent();
        //        }
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}

        // Metodo POST - Cadastro
        [Authorize(Roles = "3")]
        [HttpPost]
        public IActionResult Post(Like like)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                if (ctx.ReadAll().FirstOrDefault(L => L.IdPost == like.IdPost && L.IdPlayer == like.IdPlayer) != null)
                {
                    return BadRequest("O usuário já curtiu este post!");
                }
                like.IdPlayer = Ectx.ReadAll().FirstOrDefault(employee => employee.IdUser == Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)).Players.First().IdPlayer;
                
                Like postedLike = ctx.Create(like);

                return Ok(postedLike);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [Authorize(Roles = "3")]
        [HttpDelete("{idPost}")]
        public IActionResult Delete(int idPost)
        {
            try
            {
                Post QueryPost = Pctx.SearchByID(idPost);
                int PlayerId = Ectx.ReadAll().FirstOrDefault(employee => employee.IdUser == Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)).Players.First().IdPlayer;
                if (QueryPost == null)
                {
                    return NotFound("Post inexistente");
                }
                Like QueryLike = ctx.ReadAll().FirstOrDefault(like => like.IdPost == QueryPost.IdPost && like.IdPlayer == PlayerId);
                if (QueryLike == null)
                {
                    return NotFound();
                }
                else
                {
                    ctx.Delete(QueryLike);
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
