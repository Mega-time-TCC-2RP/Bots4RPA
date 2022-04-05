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
    }
}
