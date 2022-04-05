using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class UserName
    {
        public UserName()
        {
            Employees = new HashSet<Employee>();
        }

        public int IdUser { get; set; }
        [Required(ErrorMessage = "Nome do usuário necessário")]
        public string UserName1 { get; set; }
        [Required(ErrorMessage = "Email do usuário necessário")]
        public string Email { get; set; }
        public string Passwd { get; set; }
        [Required(ErrorMessage = "CPF do usuário necessário")]
        public string Cpf { get; set; }
        public string PhotoUser { get; set; }
        public string Phone { get; set; }
        [Required(ErrorMessage = "Data de nascimento do usuário necessária")]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "Rg do usuário necessário")]
        public string Rg { get; set; }
        public bool? UserValidation { get; set; }
        public int IdUserType { get; set; }

        public virtual UserType IdUserTypeNavigation { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
