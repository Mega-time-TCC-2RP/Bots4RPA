using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Repositories
{
    public class AssistantRepository : IAssistantRepository
    {
        RPAContext Ctx = new RPAContext();
        public void Create(Assistant NewAssistant)
        {
            Ctx.Assistants.Add(NewAssistant);
            Ctx.SaveChanges();
        }

        public void Delete(int IdAssistant)
        {
            Assistant AssistantSought = SearchByID(IdAssistant);
            Ctx.Assistants.Remove(AssistantSought);
            Ctx.SaveChanges();
        }

        public List<Assistant> ReadAll()
        {
            return Ctx.Assistants.ToList();
            //return Ctx.Assistants.Include(a => a.IdEmployeeNavigation).ToList();
        }

        public List<Assistant> ReadMy(int IdUser)
        {
            return Ctx.Assistants.Include("IdEmployeeNavigation")
                .Where(a => a.IdEmployeeNavigation.IdEmployee == IdUser)
                 .ToList();
        }

        public Assistant SearchByID(int IdAssistant)
        {
            return Ctx.Assistants
                .Include("IdEmployeeNavigation")
                .FirstOrDefault(a => a.IdAssistant == IdAssistant);
        }

        public void Update(int IdAssistant, Assistant UpdatedAsssistant)
        {
            throw new NotImplementedException();
        }
    }
}
