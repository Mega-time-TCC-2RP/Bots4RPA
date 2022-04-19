using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Office
    {
        public Office()
        {
            Employees = new HashSet<Employee>();
        }

        public int IdOffice { get; set; }
        [Required(ErrorMessage = "Título do cargo necessário")]
        public string TitleOffice { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
