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
    public class LibrarySkinsController : ControllerBase
    {
        // Vincular a Context
        private readonly ILibrarySkinRepository ctx;
        private readonly IEmployeeRepository Ectx;
        private readonly IPlayerRepository Pctx;
        private readonly ISkinRepository Sctx;
        private readonly IUserNameRepository Uctx;

        public LibrarySkinsController(ILibrarySkinRepository context, IEmployeeRepository contextEmployee, IUserNameRepository contextUser, IPlayerRepository contextPlayer, ISkinRepository contextSkin)
        {
            ctx = context;
            Ectx = contextEmployee;
            Pctx = contextPlayer;
            Sctx = contextSkin;
            Uctx = contextUser;
        }

        // Metodo GET - Listagem
        [Authorize(Roles = "1, 2")]
        [HttpGet]
        public IActionResult ReadAll()
        {
            int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
            int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
            if (UserRole == 2)
            {
                return Ok(ctx.ReadAll().Where(Ls => Pctx.ReadAll().FirstOrDefault(P => P.IdPlayer == Ls.IdPlayer).IdEmployeeNavigation.IdCorporation == Ectx.ReadAll().FirstOrDefault(E => E.IdUser == UserId).IdCorporation));
            }
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        //[Authorize(Roles = "1, 2, 3")]
        //[HttpGet("{id}")]
        //public IActionResult SearchByID(int id)
        //{
        //    try
        //    {
        //        var librarySkin = ctx.SearchByID(id);

        //        if (librarySkin == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(librarySkin);
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, LibrarySkin librarySkin)
        {
            try
            {
                librarySkin.IdLibrarySkins = id;
                LibrarySkin QueryLs = ctx.SearchByID(id);

                if (QueryLs == null)
                {
                    return NotFound();
                }

                ctx.Update(librarySkin);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "3")]
        [HttpPost("{SkinId}")]
        public IActionResult Post(int SkinId)
        {
            try
            {
                Skin QuerySkin = Sctx.SearchByID(SkinId);
                Player QueryPlayer = Pctx.SearchByID(Ectx.ReadAll().FirstOrDefault(employee => employee.IdUser == Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)).Players.First().IdPlayer);
                if (QuerySkin == null)
                {
                    return NotFound("Skin inexistente");
                }
                else if (QuerySkin.SkinPrice > QueryPlayer.Score)
                {
                    return Forbid("O jogador não possui pontos sufuicientes para adquirir a Skin");
                }
                Pctx.DecreaseScore(QueryPlayer, QuerySkin.SkinPrice);
                LibrarySkin librarySkin = new LibrarySkin()
                {
                    IdPlayer = QueryPlayer.IdPlayer,
                    IdSkin = QuerySkin.IdSkin
                };
                ctx.Create(librarySkin);
                return Ok(librarySkin);
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
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                LibrarySkin librarySkin = ctx.SearchByID(id);
                if (librarySkin == null)
                {
                    return NotFound();
                }
                if (Ectx.SearchByID(Pctx.ReadAll().FirstOrDefault(p => p.IdPlayer == librarySkin.IdPlayer).IdEmployee).IdUser != Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value) && Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value) == 3)
                {
                    return Forbid("O usuário comum só pode deletar suas skins");
                }
                else if (Ectx.SearchByID(Pctx.ReadAll().FirstOrDefault(p => p.IdPlayer == librarySkin.IdPlayer).IdEmployee).IdCorporation != Uctx.SearchByID(UserId).Employees.First().IdCorporation && UserRole == 2)
                {
                    return Forbid("O usuário administrador só pode deletar skins dos usuários de sua empresa");
                }

                ctx.Delete(librarySkin);
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
