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
using _2RPNET_API.Interfaces;

namespace _2RPNET_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNameController : ControllerBase
    {
        private IUserNameRepository _repository { get; set; }

        public UserNameController(IUserNameRepository user)
        {
            _repository = user;
        }

        /// <summary>
        /// Method responsible for list all Users
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("ListAll")]
        public IActionResult ReadAll()
        {
            try
            {
                return Ok(_repository.ReadAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for list User by unique id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{Id}")]
        public IActionResult ReadMy(int Id)
        {
            try
            {
                return Ok(_repository.SearchByID(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for update user by unique id 
        /// </summary>
        /// <param name="IdUserName"></param>
        /// <param name="UpdatedUser"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPut("{IdUserName}")]
        public IActionResult Update(int IdUserName, UserName UpdatedUser)
        {
            try
            {
                UserName UserNameSought = _repository.SearchByID(IdUserName);

                if (UserNameSought != null)
                {
                    if (UpdatedUser != null)
                        _repository.Update(IdUserName, UpdatedUser);
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
        /// Method responsible for create users
        /// </summary>
        /// <param name="NewUser"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public IActionResult Create(UserName NewUser)
        {
            try
            {
                _repository.Create(NewUser);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for delete user by unique id
        /// </summary>
        /// <param name="IdUserName"></param>
        /// <returns></returns>
        [Authorize]
        [HttpDelete("{IdUserName}")]
        public IActionResult Delete(int IdUserName)
        {
            try
            {

                if (IdUserName > 0)
                {
                    _repository.Delete(IdUserName);
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
