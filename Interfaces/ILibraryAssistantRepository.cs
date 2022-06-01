using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ILibraryAssistantRepository
    {
        List<LibraryAssistant> GetByEmployee(int IdEmployee);
    }
}
