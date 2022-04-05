using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Likes = new HashSet<Like>();
        }

        public int IdPost { get; set; }
        [Required(ErrorMessage = "Título do post necessário")]
        public string Title { get; set; }
        public string PostDescription { get; set; }
        public string PostImage { get; set; }
        public DateTime? DataPost { get; set; }
        [Required(ErrorMessage = "Id do player necessário")]
        public int IdPlayer { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
