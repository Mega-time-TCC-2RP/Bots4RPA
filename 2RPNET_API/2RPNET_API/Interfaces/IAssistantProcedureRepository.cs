using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IAssistantProcedureRepository
    {
        List<AssistantProcedure> ReadAll();

        AssistantProcedure SearchByID(int IdAssistantProcedure);

        void Create(AssistantProcedure NewProcess);

        void Update(int IdAssistantProcedure, AssistantProcedure NewProcess);

        void Delete(int IdAssistantProcedure);
    }
}
