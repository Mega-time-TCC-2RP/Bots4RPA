using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IAssistantRepository
    {
        List<Assistant> ReadAll();
    }
}
