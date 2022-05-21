using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Run
    {
        public int IdRun { get; set; }
        public int? IdAssistant { get; set; }
        public int? IdWorkflow { get; set; }
        public int? RunQuantity { get; set; }
        public DateTime? RunDate { get; set; }
        public bool? RunStatus { get; set; }
        public string RunDescription { get; set; }

        public virtual Assistant IdAssistantNavigation { get; set; }
        public virtual Workflow IdWorkflowNavigation { get; set; }
    }
}
