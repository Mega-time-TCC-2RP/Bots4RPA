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
    public class OfficesController : ControllerBase
    {
        // Vincular a Interface
        private readonly IOfficeRepository ctx;

        public OfficesController(IOfficeRepository context)
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
        //[HttpGet("{id}")]
        //public IActionResult SearchByID(int id)
        //{
        //    var Role = ctx.SearchByID(id);

        //    if (Role == null)
        //    {
        //        return NotFound(new { msg = "Não encontrado" });
        //    }

        //    return Ok(Role);
        //}

        // Metodo PUT - Atualizacao
        [HttpPut("{id}")]
        [Authorize(Roles = "1")]
        public IActionResult Update(int id, Office Role)
        {
            try
            {
                Role.IdOffice = id;
                Office UpdateRole = ctx.Update(Role);
                if (UpdateRole == null)
                {
                    return NotFound(new { msg = "Cargo não encontrado" });
                }
                else return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // Metodo POST - Cadastro
        [HttpPost]
        [Authorize(Roles = "1")]
        public IActionResult Post(Office Role)
        {
            try
            {
                ctx.Create(Role);

                return Ok(Role);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [HttpDelete("{id}")]
        [Authorize(Roles = "1")]
        public IActionResult Delete(int id)
        {
            try
            {
                var Role = ctx.SearchByID(id);
                if (Role == null)
                {
                    return NotFound(new { msg = "Cargo não encontrada ou deletada" });
                }
                else
                {
                    ctx.Delete(Role);
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
