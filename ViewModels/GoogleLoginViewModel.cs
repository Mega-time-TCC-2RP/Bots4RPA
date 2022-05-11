using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.ViewModels
{
    public class GoogleLoginViewModel
    {
        [Required(ErrorMessage = "Id do google inválido")]
        public string GoogleId { get; set; }
        [Required(ErrorMessage = "Email inválido")]
        public string Email { get; set; }
    }
}
