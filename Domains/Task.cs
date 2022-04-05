using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Task
    {
        public int IdTask { get; set; }
        public DateTime? DateHour { get; set; }
        public string Text { get; set; }
        public int? IdEmployee { get; set; }
        public int? IdStatus { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual StatusTask IdStatusNavigation { get; set; }
    }
}
