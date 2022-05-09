using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PlayersController : ControllerBase
    {
        // Vincular a Context
        private readonly IPlayerRepository ctx;
        private readonly IEmployeeRepository Ectx;

        public PlayersController(IPlayerRepository context, IEmployeeRepository contextEmployee)
        {
            ctx = context;
            Ectx = contextEmployee;
        }

        // Metodo GET - Listagem
        [HttpGet]
        [Authorize(Roles = "1,2")]
        public IActionResult ReadAll()
        {
            int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
            int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);
            if (UserRole == 2)
            {
                return Ok(ctx.ReadAll().Where(P => P.IdEmployeeNavigation.IdCorporation == Ectx.ReadAll().FirstOrDefault(E => E.IdUser == UserId).IdCorporation));
            }
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        //[HttpGet("{id}")]
        //[Authorize(Roles = "1,2")]
        //public IActionResult SearchByID(int id)
        //{
        //    var player = ctx.SearchByID(id);

        //    if (player == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(player);
        //}


        // Metodo PUT - Atualizacao


        //[HttpPut("{id}")]
        //[Authorize(Roles = "1,2")]
        //public IActionResult Update(int id, Player player)
        //{
        //    try
        //    {
        //        player.IdPlayer = id;
        //        Player QueryPlayer = ctx.SearchByID(id);

        //        if (QueryPlayer == null)
        //        {
        //            return NotFound();
        //        }

        //        ctx.Update(player);
        //        return NoContent();
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}


        // Metodo POST - Cadastro


        //[HttpPost]
        //[Authorize(Roles = "1,2")]
        //public IActionResult Post(Player player)
        //{
        //    try
        //    {
        //        ctx.Create(player);

        //        return Ok(player);
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}


        // Metodo DELETE - Remocao


        //[HttpDelete("{id}")]
        //[Authorize(Roles = "1,2")]
        //public IActionResult Delete(int id)
        //{
        //    try
        //    {
        //        Player QueryPlayer = ctx.SearchByID(id);

        //        if (QueryPlayer == null)
        //        {
        //            return NotFound();
        //        }

        //        ctx.Delete(QueryPlayer);
        //        return NoContent();
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //       throw;
        //    }
        //}
    }
}
