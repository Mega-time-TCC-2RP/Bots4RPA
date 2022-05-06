using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Trophy
    {
        public Trophy()
        {
            LibraryTrophies = new HashSet<LibraryTrophy>();
        }

        public int IdTrophy { get; set; }
        public string Title { get; set; }
        public string TrophyImage { get; set; }
        public string TrophyDescription { get; set; }

        public virtual ICollection<LibraryTrophy> LibraryTrophies { get; set; }
    }
}
