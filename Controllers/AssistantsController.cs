using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AssistantsController : ControllerBase
    {
        private readonly IAssistantRepository ctx;
        private readonly IEmployeeRepository Ectx;

        public AssistantsController(IAssistantRepository context, IEmployeeRepository contextEmployee)
        {
            ctx = context;
            Ectx = contextEmployee;
        }

        [HttpGet("{CorpId}")]
        [Authorize(Roles = "1,2")]
        public IActionResult GetDagsAssistants(int CorpId)
        {
            try
            {
                int Role = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
                if (Role != 1)
                {

                    int EmployeeId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "idEmployee").Value);
                    CorpId = Ectx.SearchByID(EmployeeId).IdCorporation;
                }
                List<AssistantDagViewModel> dags = new List<AssistantDagViewModel>();
                List<Assistant> assistants = ctx.GetDagsInfo(CorpId);
                foreach (Assistant unmountedDag in assistants)
                {
                    AssistantDagViewModel dag = new AssistantDagViewModel();
                    dag.AssistantCreationDate = unmountedDag.CreationDate;
                    dag.AssistantName = unmountedDag.AssistantName;
                    dag.EmployeeName = unmountedDag.IdEmployeeNavigation.IdUserNavigation.UserName1;
                    dag.LastRunDate = unmountedDag.Runs.OrderByDescending(run => run.RunDate).First().RunDate;
                    dag.RunsCount = unmountedDag.Runs.Count;
                    int succesfulRuns = unmountedDag.Runs.Where(run => run.RunStatus == true).Count();
                    int unsuccesfulRuns = unmountedDag.Runs.Where(run => run.RunStatus == false).Count();
                    dag.SuccesPercentage = (succesfulRuns * 100) / (succesfulRuns + unsuccesfulRuns);

                    dags.Add(dag);
                }

                return Ok(dags);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}
