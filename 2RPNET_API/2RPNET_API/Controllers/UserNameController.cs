using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using Microsoft.AspNetCore.Authorization;

namespace _2RPNET_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNameController : ControllerBase
    {
        private readonly RPAContext _context;

        public UserNameController(RPAContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Method responsible for list all Users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserName>>> GetUserNames()
        {
            return await _context.UserNames.ToListAsync();
        }

        /// <summary>
        /// Method responsible for list User by unique id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<UserName>> GetUserName(int id)
        {
            var userName = await _context.UserNames.FindAsync(id);

            if (userName == null)
            {
                return NotFound();
            }

            return userName;
        }

        /// <summary>
        /// Method responsible for update user by unique id 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserName(int id, UserName userName)
        {
            if (id != userName.IdUser)
            {
                return BadRequest();
            }

            _context.Entry(userName).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserNameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Method responsible for create all users
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<UserName>> PostUserName(UserName userName)
        {
            _context.UserNames.Add(userName);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserName", new { id = userName.IdUser }, userName);
        }

        /// <summary>
        /// Method responsible for delete user by unique id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserName(int id)
        {
            var userName = await _context.UserNames.FindAsync(id);
            if (userName == null)
            {
                return NotFound();
            }

            _context.UserNames.Remove(userName);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserNameExists(int id)
        {
            return _context.UserNames.Any(e => e.IdUser == id);
        }
    }
}
