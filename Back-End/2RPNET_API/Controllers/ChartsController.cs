using _2RPNET_API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ChartsController : ControllerBase
    {
        private IAssistantProcedureRepository _AssistantProcedureRepository { get; set; }

        public ChartsController(IAssistantProcedureRepository Assistant)
        {
            _AssistantProcedureRepository = Assistant;
        }

        /// <summary>
        /// Method responsible for list Procedure Assistant by unique id
        /// </summary>
        /// <returns></returns>
        [HttpGet("{Id}")]
        public IActionResult GraphicInformations(int Id)
        {
            try
            {
                return Ok(_AssistantProcedureRepository.SearchByID(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
