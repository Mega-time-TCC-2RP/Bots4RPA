using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Comment
    {
        public int IdComment { get; set; }
        public string Title { get; set; }
        public string CommentDescription { get; set; }
        public DateTime? DataComment { get; set; }
        public int IdPost { get; set; }
        public int IdPlayer { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Post IdPostNavigation { get; set; }
    }
}
