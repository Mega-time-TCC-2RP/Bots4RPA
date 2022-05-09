using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Repositories;
using _2RPNET_API.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;
using _2RPNET_API.ViewModels;

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
        public IActionResult ChangeVerification(string ProcedureName, ArrayViewModel ArrayViewModel)
        {
            try
            {
                //AssistantProcedure AssistantSought = _repository.SearchByName(ProcedureName);

                _repository.ChangeVerification(ProcedureName,ArrayViewModel);
                return Ok();

            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }
    }
}
