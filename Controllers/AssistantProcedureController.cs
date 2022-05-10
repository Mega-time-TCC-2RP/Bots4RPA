using System;
using Microsoft.AspNetCore.Mvc;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;
using _2RPNET_API.ViewModels;
using _2RPNET_API.Utils;
using System.Diagnostics;

namespace _2RPNET_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssistantProcedureController : ControllerBase
    {
        private IAssistantProcedureRepository _repository { get; set; }

        public AssistantProcedureController(IAssistantProcedureRepository assistant)
        {
            _repository = assistant;
        }

        

        /// <summary>
        /// Method responsible for list all Assistants Process
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Method responsible for list Assistant Process by unique id
        /// </summary>
        /// <returns></returns>
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

        [HttpGet("Assistant/{id}")]
        public IActionResult ListProcessByAssistant(int id)
        {
            try
            {
                return Ok(_repository.SearchByAssistant(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for create all Assistants Process
        /// </summary>
        /// <returns></returns>
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

        [HttpPost("ManipulateScript/{IdAssistant}")]
        public IActionResult ManipulateScript(int IdAssistant)
        {
            try
            {
                _repository.ManipulateScript(IdAssistant);
                //Process.Start("./run.bat");
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        
        /// <summary>
        /// Method responsible for update all Assistants Process
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Method responsible for delete all Assistants Process
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Method responsible for get all Assistants
        /// </summary>
        /// <returns></returns>
        [HttpPost("ProceduresVerification")]
        public IActionResult ChangeVerification(Assistant IdAssistant, ArrayViewModel ArrayViewModel)
        {
            try
            {

                _repository.ChangeVerification(ArrayViewModel);
                return Ok();

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }
    }
}
