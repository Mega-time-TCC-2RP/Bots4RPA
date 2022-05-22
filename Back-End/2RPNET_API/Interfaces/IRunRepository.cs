using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IRunRepository
    {
        Run Create(int Id,Run DataRun);
        List<Run> ReadAll();
        List<Run> ReadById(int Id);

        //List<Run> SearchByID(int IdAssistant);
        Run SearchByID(int Id);

        Run SearchAssistantByID(int IdAssistant);

        int ErrorQuantity(int IdAssistant);
        int SucessQuantity(int IdAssistant);
        List<Run> AssistantList(int id);
    }
}
