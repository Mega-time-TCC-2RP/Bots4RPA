using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IRunRepository
    {
        Run Create(Run DataRun);
        IEnumerable<Run> ReadAll();
        List<Run> ErrorList();
        List<Run> AssistantList(int id);
    }
}
