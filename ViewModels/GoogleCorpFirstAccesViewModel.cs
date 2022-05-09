using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.ViewModels
{
    public class GoogleCorpFirstAccesViewModel
    {
        public string NameFantasy { get; set; }
        [Required(ErrorMessage = "Razão Social da corporação/empresa necessário")]
        public string CorporateName { get; set; }
        [Required(ErrorMessage = "Endereço da corporação/empresa necessário")]
        public string AddressName { get; set; }
        [Required(ErrorMessage = "Telefone da corporação/empresa necessário")]
        public string CorpPhone { get; set; }
        [Required(ErrorMessage = "CNPJ da corporação/empresa necessário")]
        public string Cnpj { get; set; }



        public string UserName1 { get; set; }
        [Required(ErrorMessage = "Email do usuário necessário")]
        public string Email { get; set; }
        public string googleId { get; set; }
        [Required(ErrorMessage = "CPF do usuário necessário")]
        public string Cpf { get; set; }
        public string Phone { get; set; }
        [Required(ErrorMessage = "Data de nascimento do usuário necessária")]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "Rg do usuário necessário")]
        public string Rg { get; set; }



        public int IdOffice { get; set; }
    }
}
