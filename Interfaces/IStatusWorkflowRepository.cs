using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IStatusWorkflowRepository
    {
        StatusWorkflow Create(StatusWorkflow status);
        IEnumerable<StatusWorkflow> ReadAll();
        StatusWorkflow Update(StatusWorkflow status);
        void Delete(StatusWorkflow status);
        StatusWorkflow SearchByID(int id);
    }
}
