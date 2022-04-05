using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace _2rpnet.rpa.webAPI.Domains
{
    public partial class Quest
    {
        public int IdQuest { get; set; }
        public DateTime? DateHour { get; set; }
        [Required(ErrorMessage = "Descrição da tarefa necessária")]
        public string DescriptionQuest { get; set; }
        [Required(ErrorMessage = "Id do funcionário necessário")]
        public int IdEmployee { get; set; }
        [Required(ErrorMessage = "Id do status da tarefa necessário")]
        public int IdStatus { get; set; }

        public virtual Employee IdEmployeeNavigation { get; set; }
        public virtual StatusQuest IdStatusNavigation { get; set; }
    }
}
