using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Assistant
    {
        public Assistant()
        {
            AssistantProcedures = new HashSet<AssistantProcedure>();
            LibraryAssistants = new HashSet<LibraryAssistant>();
            Runs = new HashSet<Run>();
        }

        public int IdAssistant { get; set; }
        public int? IdEmployee { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? AlterationDate { get; set; }
        public string AssistantName { get; set; }
        public string AssistantDescription { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual ICollection<AssistantProcedure> AssistantProcedures { get; set; }
        public virtual ICollection<LibraryAssistant> LibraryAssistants { get; set; }
        public virtual ICollection<Run> Runs { get; set; }
    }
}
