using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ICorporationRepository
    {
        Corporation Create(Corporation corporate);
        IEnumerable<Corporation> ReadAll();
        Corporation Update(Corporation corporate);
        void Delete(Corporation corporate);
        Corporation SearchByID(int id);
    }
}
