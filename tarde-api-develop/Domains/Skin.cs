using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Skin
    {
        public Skin()
        {
            LibrarySkins = new HashSet<LibrarySkin>();
        }

        public int IdSkin { get; set; }
        [Required(ErrorMessage = "Titulo da skin necessário")]
        public string Title { get; set; }
        public string SkinImages { get; set; }
        public string SkinDescription { get; set; }
        [Required(ErrorMessage = "Preço da skin necessário")]
        public int SkinPrice { get; set; }

        public virtual ICollection<LibrarySkin> LibrarySkins { get; set; }
    }
}
