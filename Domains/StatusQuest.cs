using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class StatusQuest
    {
        public StatusQuest()
        {
            Quests = new HashSet<Quest>();
        }

        public int IdStatus { get; set; }
        [Required(ErrorMessage = "´Titulo do status de tarefa necessário")]
        public string Title { get; set; }

        public virtual ICollection<Quest> Quests { get; set; }
    }
}
