using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.ViewModels
{
    public class PostUserViewModel
    {
        [Required(ErrorMessage = "Nome do usuário necessário")]
        public string UserName1 { get; set; }
        [Required(ErrorMessage = "Email do usuário necessário")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Senha necessária")]
        public string Passwd { get; set; }
        [Required(ErrorMessage = "CPF do usuário necessário")]
        public string Cpf { get; set; }
        public string Phone { get; set; }
        [Required(ErrorMessage = "Data de nascimento do usuário necessária")]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "Rg do usuário necessário")]
        public string Rg { get; set; }
        [Required(ErrorMessage = "Id do tipo de usuário inválido")]
        public int IdUserType { get; set; }
        [Required(ErrorMessage = "Id da empresa inválido")]
        public int IdCorporation { get; set; }
        [Required(ErrorMessage = "Id do cargo do usuário inválido")]
        public int IdOffice { get; set; }
    }
}
