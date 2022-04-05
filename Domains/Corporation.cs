using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Required(ErrorMessage = "Nome fantasia da corporação/empresa necessário")]
        public string NameFantasy { get; set; }
        [Required(ErrorMessage = "Razão Social da corporação/empresa necessário")]
        public string CorporateName { get; set; }
        [Required(ErrorMessage = "Endereço da corporação/empresa necessário")]
        public string AddressName { get; set; }
        [Required(ErrorMessage = "Telefone da corporação/empresa necessário")]
        public string Phone { get; set; }
        [Required(ErrorMessage = "CNPJ da corporação/empresa necessário")]
        public string Cnpj { get; set; }
        public string CorporatePhoto { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
