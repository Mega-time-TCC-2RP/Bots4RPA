using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.ViewModels
{
    public class ArrayViewModel
    {
        public int IdAprocedure { get; set; }
        public int? IdAssistant { get; set; }
        public int? ProcedurePriority { get; set; }
        public string ProcedureName { get; set; }
        public string ProcedureDescription { get; set; }
    }
}
