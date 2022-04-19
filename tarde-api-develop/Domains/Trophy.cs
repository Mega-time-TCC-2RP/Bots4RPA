using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Trophy
    {
        public Trophy()
        {
            LibraryTrophies = new HashSet<LibraryTrophy>();
        }

        public int IdTrophy { get; set; }
        [Required(ErrorMessage = "Titulo do troféu necessário")]
        public string Title { get; set; }
        public string TrophyImage { get; set; }
        [Required(ErrorMessage = "Descrição do trodéu necessária")]
        public string TrophyDescription { get; set; }

        public virtual ICollection<LibraryTrophy> LibraryTrophies { get; set; }
    }
}
