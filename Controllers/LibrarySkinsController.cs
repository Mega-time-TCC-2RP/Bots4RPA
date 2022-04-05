using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
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
    public class LibrarySkinsController : ControllerBase
    {
        // Vincular a Context
        private readonly ILibrarySkinRepository ctx;

        public LibrarySkinsController(ILibrarySkinRepository context)
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
                var librarySkin = ctx.SearchByID(id);

                if (librarySkin == null)
                {
                    return NotFound();
                }

                return Ok(librarySkin);
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
        [Authorize(Roles = "1, 2, 3")]
        [HttpPost]
        public IActionResult Post(LibrarySkin librarySkin)
        {
            try
            {
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
                LibrarySkin librarySkin = ctx.SearchByID(id);
                if (librarySkin == null)
                {
                    return NotFound();
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
