using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Senha inválida")]
        public string password { get; set; }

        [Required(ErrorMessage = "Email inválido")]
        public string email { get; set; }
    }
}
