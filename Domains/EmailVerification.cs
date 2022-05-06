using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class EmailVerification
    {
        public int IdEmailVerification { get; set; }
        public int? IdAssistant { get; set; }
        public string Username { get; set; }
        public string UserPassword { get; set; }
        public string Host { get; set; }
        public string Gateway { get; set; }
        public string Cryptography { get; set; }

        public virtual Assistant IdAssistantNavigation { get; set; }
    }
}
