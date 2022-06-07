
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
using System.Diagnostics;
using _2RPNET_API.ViewModels;
namespace _2RPNET_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Assistant113Controller : ControllerBase{
        private IAssistantRepository _AssistantRepository { get; set; }

        public Assistant113Controller(IAssistantRepository Assistant)
        {
            _AssistantRepository = Assistant;
        }
/// <summary>
/// Method responsible for create a Run process
/// </summary>
[HttpPost("Post/")]
public IActionResult NewRun(SendEmailViewModel assistant)
{
    try
    {
AssistantProcess113 _program = new AssistantProcess113();
        _program.Play();
        _AssistantRepository.EnviaEmail(113,assistant);
        return StatusCode(204);
    }
    catch (Exception ex)
    {
        return BadRequest(ex);
    }
}
    }
}
