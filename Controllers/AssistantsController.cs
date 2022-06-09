using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class AssistantsController : ControllerBase
    {
        private readonly IAssistantRepository ctx;
        private readonly IEmployeeRepository Ectx;
        private readonly IUserNameRepository Uctx;

        public AssistantsController(IAssistantRepository context, IEmployeeRepository contextEmployee, IUserNameRepository contextUserName)
        {
            ctx = context;
            Ectx = contextEmployee;
            Uctx = contextUserName;
        }

        [HttpGet]
        [Authorize(Roles = "2,3")]
        public IActionResult GetDagsAssistants()
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                UserName user = Uctx.SearchByID(UserId);
                if (user.IdUserType == 2)
                {
                    int CorpId = user.Employees.First().IdCorporation;
                    List<AssistantDagViewModel> dags = new List<AssistantDagViewModel>();
                    List<Assistant> assistants = ctx.GetDagsInfo(CorpId);
                    foreach (Assistant unmountedDag in assistants)
                    {
                        AssistantDagViewModel dag = new AssistantDagViewModel();
                        dag.AssistantCreationDate = unmountedDag.CreationDate;
                        dag.AssistantName = unmountedDag.AssistantName;
                        dag.EmployeeName = unmountedDag.IdEmployeeNavigation.IdUserNavigation.UserName1;
                        if (unmountedDag.Runs.Count != 0)
                        {
                            dag.LastRunDate = unmountedDag.Runs.OrderByDescending(run => run.RunDate).FirstOrDefault().RunDate;
                            int succesfulRuns = unmountedDag.Runs.Where(run => run.RunStatus == true).Count();
                            int unsuccesfulRuns = unmountedDag.Runs.Where(run => run.RunStatus == false).Count();
                            dag.SuccesPercentage = (succesfulRuns * 100) / (succesfulRuns + unsuccesfulRuns);
                            dag.Runs = unmountedDag.Runs.ToList();
                        }
                        else
                        {
                            dag.SuccesPercentage = 0;
                            dag.LastRunDate = null;
                        }
                        dag.RunsCount = unmountedDag.Runs.Count;

                        dags.Add(dag);
                    }

                    return Ok(dags);

                }
                else
                {
                    int EmployeeId = user.Employees.First().IdEmployee;
                    List<AssistantDagViewModel> dags = new List<AssistantDagViewModel>();
                    List<Assistant> assistants = ctx.GetDagsUserInfo(EmployeeId);
                    foreach (Assistant unmountedDag in assistants)
                    {
                        AssistantDagViewModel dag = new AssistantDagViewModel();
                        dag.AssistantCreationDate = unmountedDag.CreationDate;
                        dag.AssistantName = unmountedDag.AssistantName;
                        dag.EmployeeName = unmountedDag.IdEmployeeNavigation.IdUserNavigation.UserName1;
                        if (unmountedDag.Runs.Count != 0)
                        {
                            dag.LastRunDate = unmountedDag.Runs.OrderByDescending(run => run.RunDate).FirstOrDefault().RunDate;
                            int succesfulRuns = unmountedDag.Runs.Where(run => run.RunStatus == true).Count();
                            int unsuccesfulRuns = unmountedDag.Runs.Where(run => run.RunStatus == false).Count();
                            dag.SuccesPercentage = (succesfulRuns * 100) / (succesfulRuns + unsuccesfulRuns);
                            dag.Runs = unmountedDag.Runs.ToList();
                        }
                        else
                        {
                            dag.SuccesPercentage = 0;
                            dag.LastRunDate = null;
                        }
                        dag.RunsCount = unmountedDag.Runs.Count;

                        dags.Add(dag);
                    }

                    return Ok(dags);
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
