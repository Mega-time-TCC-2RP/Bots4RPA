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
    public class LibraryTrophiesController : ControllerBase
    {
        // Vincular a Context
        private readonly ILibraryTrophyRepository ctx;

        public LibraryTrophiesController(ILibraryTrophyRepository context)
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
        [Authorize(Roles = "1, 2, 3")]
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
        [Authorize(Roles = "1, 2, 3")]
        [HttpPost]
        public IActionResult Post(LibraryTrophy libraryTro)
        {
            try
            {
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
        [Authorize(Roles = "1, 2, 3")]
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
