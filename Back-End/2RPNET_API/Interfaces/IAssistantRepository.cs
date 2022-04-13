using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IAssistantRepository
    {
        List<Assistant> ReadAll();
        List<Assistant> ReadMy(int IdUser);

        Assistant SearchByID(int IdAssistant);

        void Update(int IdAssistant, Assistant UpdatedAsssistant);

        void Create(Assistant NewAssistant);

        void Delete(int IdAssistant);



    }
}