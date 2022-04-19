using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ILibraryTrophyRepository
    {
        LibraryTrophy Create(LibraryTrophy libraryTro);
        IEnumerable<LibraryTrophy> ReadAll();
        LibraryTrophy Update(LibraryTrophy libraryTro);
        void Delete(LibraryTrophy libraryTro);
        LibraryTrophy SearchByID(int id);
    }
}
