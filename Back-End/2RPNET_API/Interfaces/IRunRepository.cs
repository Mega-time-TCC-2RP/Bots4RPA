using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IRunRepository
    {
        Run Create(Run DataRun);
        List<Run> ReadAll();
        List<Run> ReadById(int Id);

        Run SearchByID(int Id);
        List<Run> ErrorList();
        List<Run> AssistantList(int id);
    }
}
