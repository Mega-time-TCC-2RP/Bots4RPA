using _2RPNET_API.Domains;
using _2RPNET_API.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _2RPNET_API.Interfaces
{
    public interface IAssistantRepository
    {
        List<Assistant> ReadAll();
        List<Assistant> ReadMyProcess(int IdUser);

        Assistant SearchByID(int IdAssistant);

        void Update(int IdAssistant, Assistant UpdatedAsssistant);

        void Create(Assistant NewAssistant);

        void Delete(int IdAssistant);
        Task EnviaEmail(int idAssistant,SendEmailViewModel emailConfig);

        Task EnviaEmail( SendEmailViewModel emailConfig);
    }
}