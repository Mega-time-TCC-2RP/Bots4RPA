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
        private readonly IEmployeeRepository Ectx;

        public WorkflowsController(IQuestRepository context, IUserNameRepository contextUser, IStatusWorkflowRepository contextStatus, IWorkflowRepository contextWorkflow, IEmployeeRepository contextEmployee)
        {
            Qctx = context;
            Uctx = contextUser;
            Sctx = contextStatus;
            ctx = contextWorkflow;
            Ectx = contextEmployee;
        }

        [Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult ReadAll()
        {
            int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
            int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
            if (UserRole != 2)
                return Ok(ctx.ReadAll());
            else
                return Ok(ctx.ReadAll().Where(W => Ectx.SearchByID(Uctx.SearchByID(UserId).Employees.First().IdEmployee).IdCorporation == Ectx.SearchByID(W.IdEmployee).IdCorporation));
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
                else if (Ectx.ReadAll().FirstOrDefault(e => e.IdUser == UserId).IdCorporation != Ectx.SearchByID(QueryWorkflow.IdEmployee).IdCorporation && UserRole == 2)
                {
                    return Forbid("O administrador empresarial só pode alterar comentários de usuários da sua empresa");
                }
                if (Workflow.IdStatus != 1 && Workflow.IdStatus != 2 && Workflow.IdStatus != 3)
                {
                    Workflow.IdStatus = 1;
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
                int EmployeeId = Uctx.SearchByID(UserId).Employees.First().IdEmployee;
                task.IdEmployee = EmployeeId;
                Workflow CreatedWorkflow = ctx.Create(task);

                return Created("TarefaCriada", CreatedWorkflow);
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
        [HttpPatch("ChangeStatus/{idTask}/{idStatus}")]
        public IActionResult ChangeStatus(int idTask, int idStatus)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                Workflow QueryWorkflow = ctx.SearchByID(idTask);
                if (QueryWorkflow == null)
                {
                    return NotFound("Id da tarefa inválido!");
                }
                else if (QueryWorkflow.IdEmployee != Uctx.SearchByID(UserId).Employees.First().IdEmployee && UserRole == 3)
                {
                    return Forbid("O usuário comum só pode alterar o status das suas tarefas");
                }
                else if (idStatus != 1 && idStatus != 2 && idStatus != 3)
                {
                    return BadRequest("Id do status inválido");
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
                int EmployeeId = Uctx.SearchByID(UserId).Employees.First().IdEmployee;
                List<Workflow> Workflows = ctx.ReadAll().ToList();
                return Ok(Workflows.Where(W => W.IdEmployee == EmployeeId).ToList());
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}