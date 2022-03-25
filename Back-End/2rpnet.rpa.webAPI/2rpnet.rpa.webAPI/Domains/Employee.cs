using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Employee
    {
        public Employee()
        {
            Players = new HashSet<Player>();
            Tasks = new HashSet<Task>();
        }

        public int IdEmployee { get; set; }
        public bool Confirmation { get; set; }
        public int? IdUser { get; set; }
        public int? IdCorporation { get; set; }
        public int? IdRole { get; set; }

        public virtual Corporation IdCorporationNavigation { get; set; }
        public virtual Role IdRoleNavigation { get; set; }
        public virtual UserName IdUserNavigation { get; set; }
        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
