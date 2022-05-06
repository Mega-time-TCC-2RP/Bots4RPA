using _2rpnet.rpa.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IWorkflowRepository
    {
        Workflow Create(Workflow workflow);
        IEnumerable<Workflow> ReadAll();
        Workflow Update(Workflow workflow);
        void Delete(Workflow workflow);
        Workflow SearchByID(int id);
        void ChangeStatus(Workflow workflow, int IdStatus);
    }
}
