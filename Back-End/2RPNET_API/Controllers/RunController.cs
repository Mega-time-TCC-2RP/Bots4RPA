﻿using System;
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
    public class RunController : ControllerBase
    {
        private IRunRepository _repository { get; set; }

        public RunController(IRunRepository run)
        {
            _repository = run;
        }

        /// <summary>
        /// Method responsible for list all run process
        /// </summary>
        /// <returns></returns>
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
        /// Method responsible for list all failed process
        /// </summary>
        [HttpGet("ErrorQuantity")]
        public IActionResult ErrorQuantity(int IdAssistant)
        {
            try
            {
                return Ok(_repository.ErrorQuantity(IdAssistant));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        /// <summary>
        /// Method responsible for list all failed process
        /// </summary>
        [HttpGet("SucessQuantity")]
        public IActionResult SucessQuantity(int IdAssistant)
        {
            try
            {
                return Ok(_repository.SucessQuantity(IdAssistant));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for create a Run process
        /// </summary>
        [HttpPost("{Id}")]
        public IActionResult NewRun(int Id,Run DataRun)
        {
            try
            {
                _repository.Create(Id,DataRun);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Method responsible for list Run by unique id
        /// </summary>
        /// <returns></returns>
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
    }
}
