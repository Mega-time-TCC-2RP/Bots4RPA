using _2RPNET_API.Domains;
using _2RPNET_API.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _2RPNET_API.Interfaces
{
    public interface IAssistantProcedureRepository
    {
        string ManipulateScript(int IdAssistant);
        List<AssistantProcedure> SearchByAssistant(int IdAssistant);
        List<AssistantProcedure> ReadAll();

        AssistantProcedure SearchByID(int IdAssistantProcedure);

        void Create(AssistantProcedure NewProcess);

        void Update(int IdAssistantProcedure, AssistantProcedure NewProcess);

        void Delete(int IdAssistant);

        void ChangeVerification(ArrayViewModel ArrayViewModel);
        //AssistantProcedure UpdateProcess
        AssistantProcedure SearchByName(string ProcedureName);
    }
}
