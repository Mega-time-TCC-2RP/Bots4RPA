using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class StatusQuest
    {
        public StatusQuest()
        {
            Quests = new HashSet<Quest>();
        }

        public int IdStatus { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Quest> Quests { get; set; }
    }
}
