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
    public class StatusWorkflowsController : ControllerBase
    {
        // Vincular a Interface
        private readonly IStatusWorkflowRepository ctx;

        public StatusWorkflowsController(IStatusWorkflowRepository context)
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
            var status = ctx.SearchByID(id);

            if (status == null)
            {
                return NotFound(new { msg = "Não encontrado" });
            }

            return Ok(status);
        }

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, StatusWorkflow status)
        {
            try
            {
                status.IdStatus = id;
                StatusWorkflow UpdatedStatus = ctx.Update(status);
                if (UpdatedStatus == null)
                {
                    return NotFound(new { msg = "Status da Tarefa não encontrado" });
                }
                else return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(StatusWorkflow status)
        {
            try
            {
                ctx.Create(status);

                return Ok(status);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var status = ctx.SearchByID(id);
                if (status == null)
                {
                    return NotFound(new { msg = "Status da Tarefa não encontrada ou deletada" });
                }
                else
                {
                    ctx.Delete(status);
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
