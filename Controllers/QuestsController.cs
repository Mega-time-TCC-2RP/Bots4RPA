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
    public class QuestsController : ControllerBase
    {
        // Vincular a Interface
        private readonly IQuestRepository ctx;
        private readonly IUserNameRepository Uctx;
        private readonly IStatusQuestRepository Sctx;

        public QuestsController(IQuestRepository context, IUserNameRepository contextUser, IStatusQuestRepository contextStatus)
        {
            ctx = context;
            Uctx = contextUser;
            Sctx = contextStatus;
        }

        // Metodo GET - Listagem
        [Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        [Authorize(Roles = "1,2")]
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
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);
                task.IdQuest = id;
                Quest UpdateTask = ctx.Update(task);
                if (UpdateTask == null)
                {
                    return NotFound(new { msg = "Tarefa não encontrada" });
                }
                else if (task.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Unauthorized("O usuário comum só pode atualizar suas tarefas");
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
        public IActionResult Post(Quest task)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                task.IdEmployee = Uctx.SearchByID(UserId).Employees.First().IdEmployee;

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
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);

                var task = ctx.SearchByID(id);
                if (task == null)
                {
                    return NotFound(new { msg = "Tarefa não encontrada ou deletada" });
                }
                else if (task.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Unauthorized("O usuário comum só pode deletar suas tarefas");
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
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);
                Quest QueryQuest = ctx.SearchByID(idQuest);
                if (QueryQuest == null)
                {
                    return NotFound("Id da tarefa inválido!");
                }
                else if (Sctx.SearchByID(idStatus) == null)
                {
                    return NotFound("Id do status inválido!");
                }
                else if(QueryQuest.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Unauthorized("O usuário comum só pode alterar o status das suas tarefas");
                }
                else
                {
                    ctx.ChangeQuestStatus(idStatus, QueryQuest);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("ListarMinhas")]
        public IActionResult GetUserQuests()
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(ctx.ReadAll().Where(quest => quest.IdEmployee == Uctx.SearchByID(UserId).Employees.First().IdEmployee));
            }
            catch (Exception error)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
