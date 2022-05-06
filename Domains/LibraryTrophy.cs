using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class LibraryTrophy
    {
        public int IdLibraryTrophy { get; set; }
        public DateTime? UnlockData { get; set; }
        public int IdPlayer { get; set; }
        public int IdTrophy { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Trophy IdTrophyNavigation { get; set; }
    }
}
