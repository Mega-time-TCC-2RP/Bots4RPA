using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class LibrarySkin
    {
        public LibrarySkin()
        {
            LibraryAssistants = new HashSet<LibraryAssistant>();
        }

        public int IdLibrarySkins { get; set; }
        public DateTime? UnlockData { get; set; }
        public int IdPlayer { get; set; }
        public int IdSkin { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Skin IdSkinNavigation { get; set; }
        public virtual ICollection<LibraryAssistant> LibraryAssistants { get; set; }
    }
}
