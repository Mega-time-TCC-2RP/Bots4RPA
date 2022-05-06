using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
            Likes = new HashSet<Like>();
        }

        public int IdPost { get; set; }
        public string Title { get; set; }
        public string PostDescription { get; set; }
        public string PostImage { get; set; }
        public DateTime? DataPost { get; set; }
        public int IdPlayer { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
