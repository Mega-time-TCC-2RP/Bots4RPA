using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace _2RPNET_API.Repositories
{
    public class LibraryAssistantRepository : ILibraryAssistantRepository
    {
        private readonly RPAContext Ctx;

        public LibraryAssistantRepository()
        {
        }

        public LibraryAssistantRepository(RPAContext appContext)
        {
            Ctx = appContext;
        }
        public void DeleteByAssistant(int assistantId)
        {
            List<LibraryAssistant> libraryAssistantList = Ctx.LibraryAssistants.ToList().FindAll(LbA => LbA.IdAssistant == assistantId);
            foreach (LibraryAssistant item in libraryAssistantList)
            {
                Ctx.LibraryAssistants.Remove(item);
                Ctx.SaveChanges();
            }
        }

        public List<LibraryAssistant> GetByAssistant(int assistantId)
        {
            List<LibraryAssistant> libraryAssistantList = Ctx.LibraryAssistants.ToList().FindAll(LbA => LbA.IdAssistant == assistantId);
            return libraryAssistantList;
        }
    }
}
