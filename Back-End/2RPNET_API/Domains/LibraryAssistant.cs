using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class LibraryAssistant
    {
        public int IdLiraryAssistant { get; set; }
        public int? IdEmployee { get; set; }
        public int? IdAssistant { get; set; }
        public int? IdLibrarySkin { get; set; }
        public string Nickname { get; set; }
        public DateTime? UnlockDate { get; set; }

        public virtual Assistant IdAssistantNavigation { get; set; }
        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual LibrarySkin IdLibrarySkinNavigation { get; set; }
    }
}
