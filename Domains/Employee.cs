using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Employee
    {
        public Employee()
        {
            Assistants = new HashSet<Assistant>();
            Players = new HashSet<Player>();
            Quests = new HashSet<Quest>();
        }

        public int IdEmployee { get; set; }
        public bool Confirmation { get; set; }
        public int? IdUser { get; set; }
        public int? IdCorporation { get; set; }
        public int? IdOffice { get; set; }

        public virtual Corporation IdCorporationNavigation { get; set; }
        public virtual Office IdOfficeNavigation { get; set; }
        public virtual UserName IdUserNavigation { get; set; }
        public virtual ICollection<Assistant> Assistants { get; set; }
        public virtual ICollection<Player> Players { get; set; }
        public virtual ICollection<Quest> Quests { get; set; }
    }
}
