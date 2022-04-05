using _2RPNET_API.Domains;
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
    public class EmailsVerificationsController : ControllerBase
    {
        private IEmailVerificationRepository _EmailVerificationRepository { get; set; }

        public EmailsVerificationsController(IEmailVerificationRepository EmailVerification)
        {
            _EmailVerificationRepository = EmailVerification;
        }

        /// <summary>
        /// Method responsible for list all Emails Verifications 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                return Ok(_EmailVerificationRepository.ReadAll());
            }
            catch (Exception Ex)
            {
                return BadRequest(Ex);
            }
        }

        /// <summary>
        /// Method responsible for create all Emails Verifications 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Create(EmailVerification NewEmailVerification)
        {
            try
            {
                _EmailVerificationRepository.Create(NewEmailVerification);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for update all Emails Verifications
        /// </summary>
        /// <returns></returns>
        [HttpPut("{IdEmailVerification}")]
        public IActionResult Update(int IdEmailVerification, EmailVerification UpdatedEmailVerification)
        {
            try
            {
                EmailVerification EmailVerificationSought = _EmailVerificationRepository.SearchByID(IdEmailVerification);

                if (EmailVerificationSought != null)
                {
                    if (UpdatedEmailVerification != null)
                        _EmailVerificationRepository.Update(IdEmailVerification, UpdatedEmailVerification);
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
        /// Method responsible for delete all Emails Verifications
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{IdEmailVerification}")]
        public IActionResult Delete(int IdEmailVerification)
        {
            try
            {

                if (IdEmailVerification > 0)
                {
                    _EmailVerificationRepository.Delete(IdEmailVerification);
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
