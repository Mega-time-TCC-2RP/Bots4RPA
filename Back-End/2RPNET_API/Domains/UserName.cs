using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class UserName
    {
        public UserName()
        {
            Employees = new HashSet<Employee>();
        }

        public int IdUser { get; set; }
        public string UserName1 { get; set; }
        public string Email { get; set; }
        public string Passwd { get; set; }
        public string Cpf { get; set; }
        public string PhotoUser { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public string Rg { get; set; }
        public bool? UserValidation { get; set; }
        public int IdUserType { get; set; }

        public virtual UserType IdUserTypeNavigation { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
