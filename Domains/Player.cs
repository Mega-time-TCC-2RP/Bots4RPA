using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Player
    {
        public Player()
        {
            LibrarySkins = new HashSet<LibrarySkin>();
        }

        public int IdPlayer { get; set; }
        public int? Score { get; set; }
        public int? IdEmployee { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual ICollection<LibrarySkin> LibrarySkins { get; set; }
    }
}
