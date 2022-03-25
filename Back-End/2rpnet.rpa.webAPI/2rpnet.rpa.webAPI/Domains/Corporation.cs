using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Corporation
    {
        public Corporation()
        {
            Employees = new HashSet<Employee>();
        }

        public int IdCorporation { get; set; }
        public string NameFantasy { get; set; }
        public string CorporateName { get; set; }
        public string AddressName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Passwd { get; set; }
        public string Cnpj { get; set; }
        public string CorporatePhoto { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
