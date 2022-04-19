using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    public class LibraryTrophiesController : ControllerBase
    {
        // Vincular a Context
        private readonly ILibraryTrophyRepository ctx;
        private readonly IEmployeeRepository Ectx;
        private readonly ITrophyRepository Tctx;

        public LibraryTrophiesController(ILibraryTrophyRepository context, IEmployeeRepository contextEmployee, ITrophyRepository contextTrophy)
        {
            ctx = context;
            Ectx = contextEmployee;
            Tctx = contextTrophy;
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
            try
            {
                var libraryTrophy = ctx.SearchByID(id);

                if (libraryTrophy == null)
                {
                    return NotFound();
                }

                return Ok(libraryTrophy);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1, 2")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, LibraryTrophy libraryTro)
        {
            try
            {
                libraryTro.IdLibraryTrophy = id;
                LibraryTrophy QueryLt = ctx.SearchByID(id);
                if (QueryLt == null)
                {
                    return NotFound();
                }
                else
                {
                    ctx.Update(libraryTro);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "3")]
        [HttpPost]
        public IActionResult Post(int trophyId)
        {
            try
            {
                if (Tctx.SearchByID(trophyId) == null)
                {
                    return NotFound("Troféu inexistente");
                }
                LibraryTrophy libraryTro = new LibraryTrophy()
                {
                    IdTrophy = trophyId,
                    IdPlayer = Ectx.ReadAll().FirstOrDefault(employee => employee.IdUser == Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)).Players.First().IdPlayer
                };
                ctx.Create(libraryTro);
                return Ok(libraryTro);
            }
            catch (Exception error)
            {
                return BadRequest(error);
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
                LibraryTrophy QueryLt = ctx.SearchByID(id);
                if (QueryLt == null)
                {
                    return NotFound();
                }
                else
                {
                    ctx.Delete(QueryLt);
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
