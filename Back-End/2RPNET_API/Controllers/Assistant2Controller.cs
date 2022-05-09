
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
namespace _2RPNET_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Assistant2Controller : ControllerBase{
/// <summary>
/// Method responsible for create a Run process
/// </summary>
[HttpPost("Post")]
public IActionResult NewRun()
{
    try
    {AssistantProcess2 _program = new AssistantProcess2();
        _program.Play();
        return StatusCode(201);
    }
    catch (Exception ex)
    {
        return BadRequest(ex);
    }
}
    }
}
