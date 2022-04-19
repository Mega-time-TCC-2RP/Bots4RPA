using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Comment
    {
        public int IdComment { get; set; }

        [Required(ErrorMessage = "Título do comentário necessário")]
        public string Title { get; set; }
        public string CommentDescription { get; set; }
        public DateTime? DataComment { get; set; }

        [Required(ErrorMessage = "Id do post necessário")]
        public int IdPost { get; set; }
        public int IdPlayer { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Post IdPostNavigation { get; set; }
    }
}
