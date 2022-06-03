using System;

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
    }
}