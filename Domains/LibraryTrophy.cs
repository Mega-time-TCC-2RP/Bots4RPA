using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class LibraryTrophy
    {
        public int IdLibraryTrophy { get; set; }
        public DateTime? UnlockData { get; set; }
        [Required(ErrorMessage = "Id do player necessário")]
        public int IdPlayer { get; set; }
        [Required(ErrorMessage = "Id do troféu necessário")]
        public int IdTrophy { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Trophy IdTrophyNavigation { get; set; }
    }
}
