using _2RPNET_API.Domains;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _2RPNET_API.Interfaces
{
    public interface IAssistantProcedureRepository
    {
        void ManipulateScript(int IdAssistant);
        List<AssistantProcedure> SearchByAssistant(int IdAssistant);
        List<AssistantProcedure> ReadAll();

        AssistantProcedure SearchByID(int IdAssistantProcedure);

        void Create(AssistantProcedure NewProcess);

        void Update(int IdAssistantProcedure, AssistantProcedure NewProcess);

        void Delete(int IdAssistantProcedure);
    }
}
