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
        private readonly IStatusWorkflowRepository Sctx;
        private readonly IWorkflowRepository Wctx;

        public QuestsController(IQuestRepository context, IUserNameRepository contextUser, IStatusWorkflowRepository contextStatus, IWorkflowRepository contextWorkflow)
        {
            ctx = context;
            Uctx = contextUser;
            Sctx = contextStatus;
            Wctx = contextWorkflow;
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
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                task.IdQuest = id;
                Quest QueryTask = ctx.SearchByID(id);
                if (QueryTask == null)
                {
                    return NotFound(new { msg = "subtarefa não encontrada" });
                }
                else if (QueryTask.IdWorkflowNavigation.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode atualizar suas subtarefas");
                }
                Quest UpdateTask = ctx.Update(task);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        // Metodo POST - Cadastro
        [Authorize(Roles = "2,3")]
        [HttpPost]
        public IActionResult Post(Quest task)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                if( Wctx.SearchByID(task.IdWorkflow).IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee  )
                {
                    return Forbid("Apenas o usuário que criou a tarefa pode adicionar subsubtarefas");
                }

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
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);

                var task = ctx.SearchByID(id);
                if (task == null)
                {
                    return NotFound(new { msg = "subtarefa não encontrada ou deletada" });
                }
                else if (task.IdWorkflowNavigation.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode deletar suas subtarefas");
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
        [HttpPatch("ChangeStatus/{idQuest}")]
        public IActionResult ChangeStatus(int idQuest)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                Quest QueryQuest = ctx.SearchByID(idQuest);
                if (QueryQuest == null)
                {
                    return NotFound("Id da subtarefa inválido!");
                }
                else if(QueryQuest.IdWorkflowNavigation.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode alterar o status das suas subtarefas");
                }
                else
                {
                    ctx.ChangeQuestStatus(QueryQuest);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        //[Authorize(Roles = "1,2,3")]
        //[HttpGet("ListarMinhas")]
        //public IActionResult GetUserQuests()
        //{
        //    try
        //    {
        //        List<UserName> Usuarios = Uctx.ReadAll().ToList();
        //        int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
        //        return Ok(ctx.ReadAll().Where(quest => quest.IdWorkflowNavigation.IdEmployee == Uctx.SearchByID(UserId).Employees.First().IdEmployee));
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}
    }
}
