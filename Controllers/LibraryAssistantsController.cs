using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LibraryAssistantsController : ControllerBase
    {
        private readonly ILibraryAssistantRepository ctx;

        public LibraryAssistantsController(ILibraryAssistantRepository context)
        {
            ctx = context;
        }

        [HttpGet]
        [Authorize(Roles = "2,3")]
        public IActionResult GetLibraryAssistantsByEmployee()
        {
            int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "idEmployee").Value);
            try
            {
                List<LibraryAssistant> LbAssistants = ctx.GetByEmployee(UserId);
                return Ok(LbAssistants);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpPost]
        [Authorize(Roles = "2,3")]
        public IActionResult ChangeOrAddLbAssistantSkin(LibraryAssistantChangeSkinViewModel lbAssistant)
        {
            int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "idEmployee").Value);
            try
            {
                List<LibraryAssistant> userAssistants = ctx.GetByEmployee(UserId).ToList();
                if (userAssistants.Find(lbA => lbA.IdLiraryAssistant == lbAssistant.idLibraryAssistant) == null)
                {
                    return Forbid("O usuário só pode alterar a skin de seus assistentes");
                }
                else
                {
                    ctx.ChangeLbSkin(lbAssistant);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}