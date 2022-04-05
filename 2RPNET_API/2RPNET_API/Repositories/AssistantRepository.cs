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
        private readonly RPAContext Ctx;
        public AssistantRepository(RPAContext appContext)
        {
            Ctx = appContext;
        }

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
        }

        public List<Assistant> ReadSearchByID(int IdUser)
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
            Assistant AssistantSought = SearchByID(IdAssistant);

            if (UpdatedAsssistant.IdEmployee > 0 && UpdatedAsssistant.CreationDate >= DateTime.Now && UpdatedAsssistant.AlterationDate >= DateTime.Now && UpdatedAsssistant.AssistantName != null && UpdatedAsssistant.AssistantDescription != null)
            {
                AssistantSought.IdEmployee = UpdatedAsssistant.IdEmployee;
                AssistantSought.CreationDate = UpdatedAsssistant.CreationDate;
                AssistantSought.AlterationDate = UpdatedAsssistant.AlterationDate;
                AssistantSought.AssistantName = UpdatedAsssistant.AssistantName;
                AssistantSought.AssistantDescription = UpdatedAsssistant.AssistantDescription;

                Ctx.Assistants.Update(AssistantSought);
                Ctx.SaveChanges();
            }
           
        }
    }
}
