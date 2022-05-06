using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Player
    {
        public Player()
        {
            Comments = new HashSet<Comment>();
            LibrarySkins = new HashSet<LibrarySkin>();
            LibraryTrophies = new HashSet<LibraryTrophy>();
            Likes = new HashSet<Like>();
            Posts = new HashSet<Post>();
        }

        public int IdPlayer { get; set; }
        public int? Score { get; set; }
        public int IdEmployee { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<LibrarySkin> LibrarySkins { get; set; }
        public virtual ICollection<LibraryTrophy> LibraryTrophies { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
