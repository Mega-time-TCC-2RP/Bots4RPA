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
        //    var role = ctx.SearchByID(id);

        //    if (role == null)
        //    {
        //        return NotFound(new { msg = "Não encontrado" });
        //    }

        //    return Ok(role);
        //}

        // Metodo PUT - Atualizacao
        [HttpPut("{id}")]
        [Authorize(Roles = "1")]
        public IActionResult Update(int id, Office role)
        {
            try
            {
                role.IdOffice = id;
                Office UpdateRole = ctx.Update(role);
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
        public IActionResult Post(Office role)
        {
            try
            {
                ctx.Create(role);

                return Ok(role);
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
                var role = ctx.SearchByID(id);
                if (role == null)
                {
                    return NotFound(new { msg = "Cargo não encontrada ou deletada" });
                }
                else
                {
                    ctx.Delete(role);
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
