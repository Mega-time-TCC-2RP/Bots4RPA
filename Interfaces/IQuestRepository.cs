using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IQuestRepository
    {
        Quest Create(Quest quest);
        IEnumerable<Quest> ReadAll();
        Quest Update(Quest quest);
        void Delete(Quest quest);
        Quest SearchByID(int id);
        void ChangeQuestStatus(int idStatus, Quest quest);
    }
}
