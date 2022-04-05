using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class UserType
    {
        public UserType()
        {
            UserNames = new HashSet<UserName>();
        }

        public int IdUserType { get; set; }
        public string TitleUserType { get; set; }

        public virtual ICollection<UserName> UserNames { get; set; }
    }
}
