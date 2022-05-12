using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class LibrarySkinRepository : ILibrarySkinRepository
    {
        private readonly DoisRPnetContext ctx;

        public LibrarySkinRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public LibrarySkin Create(LibrarySkin librarySkin)
        {
            ctx.LibrarySkins.Add(librarySkin);
            ctx.SaveChangesAsync();

            return librarySkin;
        }

        public void Delete(LibrarySkin librarySkin)
        {
            ctx.LibrarySkins.Remove(librarySkin);
            ctx.SaveChanges();
        }

        public IEnumerable<LibrarySkin> ReadAll()
        {
            return ctx.LibrarySkins.ToList();
        }

        public LibrarySkin SearchByID(int id)
        {
            return ctx.LibrarySkins.AsNoTracking().ToList().FirstOrDefault(ls => ls.IdLibrarySkins == id);
        }

        public LibrarySkin Update(LibrarySkin librarySkin)
        {
            ctx.Entry(librarySkin).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return librarySkin;
        }
    }
}
