using System;
using System.Collections.Generic;

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
        public string TitleOffice { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
