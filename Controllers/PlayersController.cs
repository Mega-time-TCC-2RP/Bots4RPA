using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public PlayersController(IPlayerRepository context)
        {
            ctx = context;
        }

        // Metodo GET - Listagem
        [HttpGet]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        [HttpGet("{id}")]
        public IActionResult SearchByID(int id)
        {
            var player = ctx.SearchByID(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // Metodo PUT - Atualizacao
        [HttpPut("{id}")]
        public IActionResult Update(int id, Player player)
        {
            try
            {
                player.IdPlayer = id;
                Player QueryPlayer = ctx.SearchByID(id);

                if (QueryPlayer == null)
                {
                    return NotFound();
                }

                ctx.Update(player);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [HttpPost]
        public IActionResult Post(Player player)
        {
            try
            {
                ctx.Create(player);

                return Ok(player);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Player QueryPlayer = ctx.SearchByID(id);

                if (QueryPlayer == null)
                {
                    return NotFound();
                }

                ctx.Delete(QueryPlayer);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}
