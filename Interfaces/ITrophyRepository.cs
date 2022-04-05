using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ITrophyRepository
    {
        Trophy Create(Trophy trophy);
        IEnumerable<Trophy> ReadAll();
        Trophy Update(Trophy trophy);
        void Delete(Trophy trophy);
        Trophy SearchByID(int id);
    }
}
