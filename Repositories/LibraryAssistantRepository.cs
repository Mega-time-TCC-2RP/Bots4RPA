using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
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
        public List<LibraryAssistant> GetByEmployee(int IdEmployee)
        {
            return ctx.LibraryAssistants.Include(La => La.IdAssistantNavigation).ToList().FindAll(x => x.IdEmployee == IdEmployee);
        }
    }
}
