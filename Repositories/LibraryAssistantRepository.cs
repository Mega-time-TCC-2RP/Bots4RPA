using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class LibraryAssistantRepository : ILibraryAssistantRepository
    {
        private readonly DoisRPnetContext ctx;

        public LibraryAssistantRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public LibraryAssistant ChangeLbSkin(LibraryAssistantChangeSkinViewModel lbAssistant)
        {
            LibraryAssistant lbAssistantQuery = ctx.LibraryAssistants.FirstOrDefault(lbA => lbA.IdLiraryAssistant == lbAssistant.idLibraryAssistant);
            if (lbAssistantQuery == null)
            {
                return null;
            }
            else if (lbAssistantQuery.IdLibrarySkin != lbAssistant.idLibrarySkin)
            {
                lbAssistantQuery.IdLibrarySkin = lbAssistant.idLibrarySkin;
                ctx.LibraryAssistants.Update(lbAssistantQuery);
                ctx.SaveChanges();
            }
            return lbAssistantQuery;
        }

        public List<LibraryAssistant> GetByEmployee(int IdEmployee)
        {
            return ctx.LibraryAssistants.Include(La => La.IdAssistantNavigation).Include(La => La.IdLibrarySkinNavigation).ThenInclude(Ls => Ls.IdSkinNavigation).ToList().FindAll(x => x.IdEmployee == IdEmployee);
        }
    }
}
