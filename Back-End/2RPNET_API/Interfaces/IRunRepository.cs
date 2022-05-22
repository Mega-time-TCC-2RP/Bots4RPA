using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IRunRepository
    {
        Run Create(int IdAssistant, Run DataRun);
        List<Run> ReadAll();
        List<Run> ReadById(int Id);

        //List<Run> SearchByID(int IdAssistant);
        Run SearchByID(int Id);

        Run SearchAssistantByID(int IdAssistant);

        int ErrorQuantity(int IdAssistant);
        int SucessQuantity(int IdAssistant);
        int RunQuantity(int IdAssistant);
        List<Run> AssistantList(int id);
    }
}
