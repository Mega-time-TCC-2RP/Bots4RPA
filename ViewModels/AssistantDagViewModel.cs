using _2rpnet.rpa.webAPI.Domains;
using System;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.ViewModels
{
    public class AssistantDagViewModel
    {
        public string EmployeeName { get; set; }
        public string AssistantName { get; set; }
        public DateTime AssistantCreationDate { get; set; }
        public DateTime? LastRunDate { get; set; }
        public int SuccesPercentage { get; set; }
        public int RunsCount { get; set; }
        public List<Run> Runs { get; set; }
    }
}