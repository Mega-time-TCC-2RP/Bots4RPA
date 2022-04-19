using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IStatusQuestRepository
    {
        StatusQuest Create(StatusQuest status);
        IEnumerable<StatusQuest> ReadAll();
        StatusQuest Update(StatusQuest status);
        void Delete(StatusQuest status);
        StatusQuest SearchByID(int id);
    }
}
