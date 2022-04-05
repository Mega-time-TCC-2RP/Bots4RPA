using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ILibrarySkinRepository
    {
        LibrarySkin Create(LibrarySkin librarySkin);
        IEnumerable<LibrarySkin> ReadAll();
        LibrarySkin Update(LibrarySkin librarySkin);
        void Delete(LibrarySkin librarySkin);
        LibrarySkin SearchByID(int id);
    }
}
