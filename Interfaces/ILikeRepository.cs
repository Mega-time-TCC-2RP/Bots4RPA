using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ILikeRepository
    {
        Like Create(Like like);
        IEnumerable<Like> ReadAll();
        Like Update(Like like);
        void Delete(Like like);
        Like SearchByID(int id);
    }
}
