using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Like
    {
        public int IdLikes { get; set; }
        [Required(ErrorMessage = "Id do post necessário")]
        public int IdPost { get; set; }
        [Required(ErrorMessage = "Id do player necessário")]
        public int IdPlayer { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Post IdPostNavigation { get; set; }
    }
}
