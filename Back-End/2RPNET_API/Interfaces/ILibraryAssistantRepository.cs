using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface ILibraryAssistantRepository
    {
        void DeleteByAssistant(int assistantId);

        List<LibraryAssistant> GetByAssistant(int assistantId);
    }
}
