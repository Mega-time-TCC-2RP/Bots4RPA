using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.Repositories;
using _2RPNET_API.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
        private IAssistantProcedureRepository _AssistantProcedureRepository { get; set; }
        private IRunRepository _RunRepository { get; set; }
        private ILibraryAssistantRepository _libraryAssistantRepository { get; set; }

        public AssistantsController(IAssistantRepository Assistant, IAssistantProcedureRepository assistantProcedure, IRunRepository run, ILibraryAssistantRepository libraryAssistant)
        {
            _AssistantRepository = Assistant;
            _AssistantProcedureRepository = assistantProcedure;
            _RunRepository = run;
            _libraryAssistantRepository = libraryAssistant;
        }

        /// <summary>
        /// Method responsible for list all Assistants
        /// </summary>
        /// <returns></returns>
        [Authorize]
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

        /// <summary>
        /// Method responsible for list Assistant by unique id
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{IdAssistant}")]
        public IActionResult ReadMy(int IdAssistant)
        {
            try
            {
                return Ok(_AssistantRepository.SearchByID(IdAssistant));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        /// <summary>
        /// Method responsible for list Assistant by unique Id Employee
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("Employee/{IdEmployee}")]
        public IActionResult FindByIdEmployee(int IdEmployee)
        {
            try
            {
                return Ok(_AssistantRepository.FindByIdEmployee(IdEmployee));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for create Assistants
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public IActionResult Create(Assistant NewAssistant)
        {
            try
            {
                if (NewAssistant.AssistantName != null || NewAssistant.AssistantDescription != null)
                {
                    _AssistantRepository.Create(NewAssistant);
                    return Created("Assitant created successfully", NewAssistant);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for update Assistant
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPut("{IdAssistant}")]
        public IActionResult Update(int IdAssistant, Assistant UpdatedAsssistant)
        {
            try
            {
                Assistant AssistantSought = _AssistantRepository.SearchByID(IdAssistant);

                if (AssistantSought != null)
                {
                    if (UpdatedAsssistant != null)
                    {
                        _AssistantRepository.Update(IdAssistant, UpdatedAsssistant);
                    }
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


        /// <summary>
        /// Method responsible for delete Assistants 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpDelete("{IdAssistant}")]
        public IActionResult Delete(int IdAssistant)
        {
            try
            {
                if (IdAssistant > 0)
                {
                    List<AssistantProcedure> listProcedures = _AssistantProcedureRepository.SearchByAssistant(IdAssistant);
                    List<Run> listRuns = _RunRepository.AssistantList(IdAssistant);
                    List<LibraryAssistant> listLbAssistants = _libraryAssistantRepository.GetByAssistant(IdAssistant);
                    if (listProcedures != null)
                    {
                        _AssistantProcedureRepository.Delete(IdAssistant);
                    }
                    if (listRuns != null)
                    {
                        _RunRepository.Delete(IdAssistant);

                    }
                    if (listLbAssistants != null)
                    {
                        _libraryAssistantRepository.DeleteByAssistant(IdAssistant);
                    }
                    
                    _AssistantRepository.Delete(IdAssistant);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }

            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }

        /// <summary>
        /// Method responsible for send emails
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("EnviarEmail")]
        public IActionResult EnviaEmail(int idAssistant, SendEmailViewModel assistant)
        {
            try
            {
                _AssistantRepository.EnviaEmail(idAssistant, assistant);
                return Ok(new
                {
                    Mensagem = "Código enviado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }
        }

        /// <summary>
        /// Method responsible for send personalized emails
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("EnviarEmailUsuario")]
        public IActionResult EnviaEmail(SendEmailViewModel assistant)
        {
            try
            {
                _AssistantRepository.EnviaEmail(assistant);
                return Ok(new
                {
                    Mensagem = "Código enviado"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }
        }
    }
}