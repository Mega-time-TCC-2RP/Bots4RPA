using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace _2RPNET_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssistantProcedureController : ControllerBase
    {
        private IAssistantProcedureRepository _repository { get; set; }

        public AssistantProcedureController(IAssistantProcedureRepository ass)
        {
            _repository = ass;
        }

        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                return Ok(_repository.ReadAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public IActionResult SearchByID(int id)
        {
            try
            {
                return Ok(_repository.SearchByID(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        public IActionResult NewProcedure(AssistantProcedure newProcess)
        {
            try
            {
                _repository.Create(newProcess);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                _repository.Delete(id);
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, AssistantProcedure newProcess)
        {
            try
            {
                _repository.Update(id, newProcess);
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
