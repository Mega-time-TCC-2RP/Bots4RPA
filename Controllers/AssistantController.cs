using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.Repositories;
using _2RPNET_API.ViewModels;
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

        /// <summary>
        /// Method responsible for list all Assistants
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Method responsible for analyze all Assistants
        /// </summary>
        /// <returns></returns>
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
        /// Method responsible for update all Assistants
        /// </summary>
        /// <returns></returns>
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
        /// Method responsible for delete all Assistants 
        /// </summary>
        /// <returns></returns>
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

        [HttpPost("EnviarEmail")]
        public IActionResult EnviaEmail(int idAssistant,SendEmailViewModel assistant)
        {
            try
            {
                _AssistantRepository.EnviaEmail(idAssistant,assistant);

                RunRepository run = new RunRepository();
                run.UpdateQuantity(idAssistant, UpdatedRun);

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

        [HttpPost("EnviarEmailUsuario")]
        public IActionResult EnviaEmail( SendEmailViewModel assistant)
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