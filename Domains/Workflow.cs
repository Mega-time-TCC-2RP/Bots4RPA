using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Workflow
    {
        public Workflow()
        {
            Quests = new HashSet<Quest>();
        }

        public int IdWorkflow { get; set; }
        public int IdEmployee { get; set; }
        public int IdStatus { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public string WorkflowDescription { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual StatusWorkflow IdStatusNavigation { get; set; }
        public virtual ICollection<Quest> Quests { get; set; }
    }
}
