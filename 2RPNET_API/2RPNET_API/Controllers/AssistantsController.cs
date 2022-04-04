using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AssistantsController : ControllerBase
    {
        private IAssistantRepository _AssistantRepository { get; set; }

        public AssistantsController(IAssistantRepository Assistant)
        {
            _AssistantRepository = Assistant;
        }

        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                return Ok(_AssistantRepository.ReadAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public IActionResult ReadMy(int id)
        {
            try
            {
                return Ok(_AssistantRepository.SearchByID(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult Create(Assistant NewAssistant)
        {
            _AssistantRepository.Create(NewAssistant);      
            return StatusCode(201);
        }
    }
             
}
