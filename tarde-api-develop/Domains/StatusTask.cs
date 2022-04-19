using System;
using System.Collections.Generic;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class StatusTask
    {
        public StatusTask()
        {
            Tasks = new HashSet<Task>();
        }

        public int IdStatus { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
