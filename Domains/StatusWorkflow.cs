using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class StatusWorkflow
    {
        public StatusWorkflow()
        {
            Workflows = new HashSet<Workflow>();
        }

        public int IdStatus { get; set; }
        public string StatusTitle { get; set; }

        public virtual ICollection<Workflow> Workflows { get; set; }
    }
}
