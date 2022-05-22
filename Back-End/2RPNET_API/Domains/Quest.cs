using System;
using System.Collections.Generic;

#nullable disable

namespace _2RPNET_API.Domains
{
    public partial class Quest
    {
        public int IdQuest { get; set; }
        public bool? Completed { get; set; }
        public string Title { get; set; }
        public string QuestDescription { get; set; }

    }
}
