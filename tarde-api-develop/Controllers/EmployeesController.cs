using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
    public class EmployeesController : ControllerBase
    {
        // Vincular a Context
        private readonly IEmployeeRepository ctx;

        public EmployeesController(IEmployeeRepository context)
        {
            ctx = context;
        }

        // Metodo GET - Listagem
        [HttpGet]
        [Authorize(Roles = "1,2")]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        [HttpGet("{id}")]
        [Authorize(Roles = "1,2")]
        public IActionResult SearchByID(int id)
        {
            var employee = ctx.SearchByID(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // Metodo PUT - Atualizacao


        //[HttpPut("{id}")]
        //[Authorize(Roles = "1,2")]
        //public IActionResult Update(int id, Employee employee)
        //{
        //    try
        //    {
        //        employee.IdEmployee = id;

        //        Employee QueryEmployee = ctx.SearchByID(id);

        //        if (QueryEmployee == null)
        //        {
        //            return NotFound();
        //        }
        //        ctx.Update(employee);
        //        return NoContent();
        //    }
        //    catch (Exception error)
        //    {
        //       return BadRequest(error);
        //        throw;
        //   }
        //}

        // Metodo POST - Cadastro


        //[HttpPost]
        //[Authorize(Roles = "1,2")]
        //public IActionResult Post(Employee employee)
        //{
        //    try
        //    {
        //        ctx.Create(employee);

        //        return Ok(employee);
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
        //        Employee QueryEmployee = ctx.SearchByID(id);

        //       if (QueryEmployee == null)
        //            return NotFound();

        //        ctx.Delete(QueryEmployee);

        //        return NoContent();
        //    }
        //    catch (Exception error)
        //    {
        //        BadRequest(error);
        //        throw;
        //    }
        //}
    }
}
