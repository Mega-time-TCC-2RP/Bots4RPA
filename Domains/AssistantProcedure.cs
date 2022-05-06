using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class AssistantProcedure
    {
        public int IdAprocedure { get; set; }
        public int? IdAssistant { get; set; }
        public int? ProcedurePriority { get; set; }
        public string ProcedureName { get; set; }
        public string ProcedureDescription { get; set; }
        public string ProcedureValue { get; set; }

        public virtual Assistant IdAssistantNavigation { get; set; }
    }
}
