using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Role
    {
        public Role()
        {
            Employees = new HashSet<Employee>();
        }

        public int IdRole { get; set; }
        public string TitleRole { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
