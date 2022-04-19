using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IOfficeRepository
    {
        Office Create(Office role);
        IEnumerable<Office> ReadAll();
        Office Update(Office role);
        void Delete(Office role);
        Office SearchByID(int id);
    }
}
