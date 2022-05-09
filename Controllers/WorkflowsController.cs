using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class WorkflowsController : ControllerBase
    {
        private readonly IQuestRepository Qctx;
        private readonly IUserNameRepository Uctx;
        private readonly IStatusWorkflowRepository Sctx;
        private readonly IWorkflowRepository ctx;

        public WorkflowsController(IQuestRepository context, IUserNameRepository contextUser, IStatusWorkflowRepository contextStatus, IWorkflowRepository contextWorkflow)
        {
            Qctx = context;
            Uctx = contextUser;
            Sctx = contextStatus;
            ctx = contextWorkflow;
        }

        [Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        [Authorize(Roles ="1,2")]
        [HttpGet("{id}")]
        public IActionResult SearchById(int id) 
        {
            var Workflow = ctx.SearchByID(id);

            if (Workflow == null)
            {
                return NotFound(new { msg = "Não encontrado" });
            }

            return Ok(Workflow);
        }

        [Authorize(Roles = "1,2,3")]
        [HttpPut("{id}")]
        public IActionResult Update(int id, Workflow Workflow)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                Workflow.IdWorkflow = id;
                Workflow QueryWorkflow = ctx.SearchByID(id);
                if (QueryWorkflow == null)
                {
                    return NotFound(new { msg = "Tarefa não encontrada" });
                }
                else if (QueryWorkflow.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode atualizar suas tarefas");
                }
                Workflow.IdEmployee = QueryWorkflow.IdEmployee;
                Workflow UpdateWorkflow = ctx.Update(Workflow);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [Authorize(Roles = "2,3")]
        [HttpPost]
        public IActionResult Post(Workflow task)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                task.IdEmployee = UserId;
                ctx.Create(task);

                return Ok(task);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

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
                    return NotFound(new { msg = "tarefa não encontrada ou deletada" });
                }
                else if (task.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode deletar suas tarefas");
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
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                Workflow QueryWorkflow = ctx.SearchByID(idQuest);
                if (QueryWorkflow == null)
                {
                    return NotFound("Id da tarefa inválido!");
                }
                else if (QueryWorkflow.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode alterar o status das suas tarefas");
                }
                else
                {
                    if (Sctx.SearchByID(idStatus) == null)
                    {
                        return BadRequest("O id do status especificado é inexistente");
                    }
                    ctx.ChangeStatus(QueryWorkflow, idStatus);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "2,3")]
        [HttpGet("GetMine")]
        public IActionResult ReadMine()
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(ctx.ReadAll().Where(W => W.IdEmployee == Uctx.SearchByID(UserId).Employees.First().IdEmployee).ToList());
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}