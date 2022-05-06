using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Quest
    {
        public int IdQuest { get; set; }
        public int IdWorkflow { get; set; }
        public bool? Completed { get; set; }
        public string Title { get; set; }
        public string QuestDescription { get; set; }

        public virtual Workflow IdWorkflowNavigation { get; set; }
    }
}
