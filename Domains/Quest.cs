using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Quest
    {
        public int IdQuest { get; set; }
        public DateTime? DateHour { get; set; }
        public string DescriptionQuest { get; set; }
        public int IdEmployee { get; set; }
        public int IdStatus { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual StatusQuest IdStatusNavigation { get; set; }
    }
}
