using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class LibrarySkin
    {
        public int IdLibrarySkins { get; set; }
        public DateTime? UnlockData { get; set; }
        [Required(ErrorMessage = "Id do player necessário")]
        public int IdPlayer { get; set; }
        [Required(ErrorMessage = "Id da skin necessário")]
        public int IdSkin { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Skin IdSkinNavigation { get; set; }
    }
}
