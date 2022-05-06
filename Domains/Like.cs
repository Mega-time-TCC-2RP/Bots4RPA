using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Like
    {
        public int IdLikes { get; set; }
        public int IdPost { get; set; }
        public int IdPlayer { get; set; }

        public virtual Player IdPlayerNavigation { get; set; }
        public virtual Post IdPostNavigation { get; set; }
    }
}
