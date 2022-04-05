using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Controllers
{
    public class TController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
