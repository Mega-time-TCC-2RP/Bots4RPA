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
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }

        [HttpGet("{Id}")]
        public IActionResult ReadMy(int Id)
        {
            try
            {
                return Ok(_AssistantRepository.SearchByID(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult Create(Assistant NewAssistant)
        {
            try
            {
                _AssistantRepository.Create(NewAssistant);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{IdAssistant}")]
        public IActionResult Update(int IdAssistant, Assistant UpdatedAsssistant)
        {
            try
            {
                Assistant AssistantSought = _AssistantRepository.SearchByID(IdAssistant);

                if (AssistantSought != null)
                {
                    if (UpdatedAsssistant != null)
                        _AssistantRepository.Update(IdAssistant, UpdatedAsssistant);
                }
                else
                {
                    return BadRequest();
                }

                return Ok();

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }

        [HttpDelete("{IdAssistant}")]
        public IActionResult Delete(int IdAssistant)
        {
            try
            {

                if (IdAssistant > 0)
                {
                    _AssistantRepository.Delete(IdAssistant);
                }
                else
                {
                    return BadRequest();
                }

                return Ok();

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }
    }

}