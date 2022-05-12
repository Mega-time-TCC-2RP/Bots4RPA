using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class LibrarySkin
    {
        public int IdLibrarySkins { get; set; }
        public DateTime? UnlockData { get; set; }
        public int IdPlayer { get; set; }
        public int IdSkin { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Skin IdSkinNavigation { get; set; }
    }
}
