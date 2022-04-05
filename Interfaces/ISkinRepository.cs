using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ISkinRepository
    {
        Skin Create(Skin skin);
        IEnumerable<Skin> ReadAll();
        Skin Update(Skin skin);
        void Delete(Skin skin);
        Skin SearchByID(int id);
    }
}
