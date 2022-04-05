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
    public class QuestsController : ControllerBase
    {
        // Vincular a Interface
        private readonly IQuestRepository ctx;

        public QuestsController(IQuestRepository context)
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
            var task = ctx.SearchByID(id);

            if (task == null)
            {
                return NotFound(new { msg = "Não encontrado" });
            }

            return Ok(task);
        }

        // Metodo PUT - Atualizacao
        [Authorize(Roles = "1,2,3")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Quest task)
        {
            try
            {
                task.IdQuest = id;
                Quest UpdateTask = ctx.Update(task);
                if (UpdateTask == null)
                {
                    return NotFound(new { msg = "Tarefa não encontrada" });
                }
                else return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "1, 2, 3")]
        [HttpPost]
        public IActionResult Post(Quest task)
        {
            try
            {
                ctx.Create(task);

                return Ok(task);
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
                var task = ctx.SearchByID(id);
                if (task == null)
                {
                    return NotFound(new { msg = "Tarefa não encontrada ou deletada" });
                }
                else
                {
                    ctx.Delete(task);
                    return NoContent();
                }

            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "1, 2, 3")]
        [HttpPatch("ChangeStatus/{idQuest}/{idStatus}")]
        public IActionResult ChangeStatus(int idQuest, int idStatus)
        {
            try
            {
                Quest QueryQuest = ctx.SearchByID(idQuest);
                if (QueryQuest == null)
                {
                    return NotFound("Id da tarefa inválido!");
                }
                else
                {
                    ctx.ChangeQuestStatus(idStatus, QueryQuest);
                    return NoContent();
                }
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
