using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class LibraryTrophyRepository : ILibraryTrophyRepository
    {
        private readonly DoisRPnetContext ctx;

        public LibraryTrophyRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public LibraryTrophy Create(LibraryTrophy libraryTro)
        {
            ctx.LibraryTrophies.Add(libraryTro);
            ctx.SaveChangesAsync();

            return libraryTro;
        }

        public void Delete(LibraryTrophy libraryTro)
        {
            ctx.LibraryTrophies.Remove(libraryTro);
            ctx.SaveChanges();
        }

        public IEnumerable<LibraryTrophy> ReadAll()
        {
            return ctx.LibraryTrophies.ToList();
        }

        public LibraryTrophy SearchByID(int id)
        {
            return ctx.LibraryTrophies.AsNoTracking().ToList().FirstOrDefault(lt => lt.IdLibraryTrophy == id);
        }

        public LibraryTrophy Update(LibraryTrophy libraryTro)
        {
            ctx.Entry(libraryTro).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return libraryTro;
        }
    }
}
