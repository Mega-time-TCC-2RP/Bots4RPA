using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.ViewModels;
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

        public void ChangeVerification(int IdAssistant, ArrayViewModel ArrayViewModel)
        {

            Assistant AssistantSought = SearchByID(IdAssistant);
            //Assistant AssistantList = new Assistant();

            List<AssistantProcedure> AssistantList = Ctx.AssistantProcedures.Include(c => c.IdAssistant).Where(c => c.IdAssistant == IdAssistant).ToList();
            //var AssistantProcedureList = AssistantProcedure.ToList();

            foreach (var item in AssistantList)
            {
                if (item != null)
                {
                    if (item.IdAssistant != AssistantSought.IdAssistant)
                    {
                        item.IdAssistant = AssistantSought.IdAssistant;
                    }

                    if (item.ProcedurePriority != ArrayViewModel.ProcedurePriority)
                    {
                        item.ProcedurePriority = ArrayViewModel.ProcedurePriority;
                    }

                    if (item.ProcedureName != ArrayViewModel.ProcedureName)
                    {
                        item.ProcedureName = ArrayViewModel.ProcedureName;
                    }

                    if (item.ProcedureDescription != ArrayViewModel.ProcedureDescription)
                    {
                        item.ProcedureDescription = ArrayViewModel.ProcedureDescription;
                    }

                    Ctx.Assistants.Update(AssistantSought);
                }
            }

            foreach (var item in AssistantList)
            {
                if (item.IdAssistant != AssistantSought.IdAssistant)
                {
                    if (item.ProcedurePriority != ArrayViewModel.ProcedurePriority)
                    {
                        if (item.ProcedureName != ArrayViewModel.ProcedureName)
                        {
                            if (item.ProcedureDescription != ArrayViewModel.ProcedureDescription)
                            {
                                Ctx.Add(ArrayViewModel);
                            }
                        }
                    }
                }
            }
        }

        public void Create(Assistant NewAssistant)
        {
                NewAssistant.CreationDate = DateTime.Now;
                NewAssistant.AlterationDate = DateTime.Now;
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
            return Ctx.Assistants
                .Where(a => a.IdAssistant == IdUser)
                 .ToList();
        }

        public Assistant SearchByID(int IdAssistant)
        {
            return Ctx.Assistants
                .FirstOrDefault(a => a.IdAssistant == IdAssistant);
        }

        public void Update(int IdAssistant, Assistant UpdatedAsssistant)
        {
            Assistant AssistantSought = SearchByID(IdAssistant);

            if (AssistantSought != null)
            {
                AssistantSought.AlterationDate = DateTime.Now;

                if (UpdatedAsssistant.IdEmployee > 0)
                {
                    AssistantSought.IdEmployee = UpdatedAsssistant.IdEmployee;
                }
                if (UpdatedAsssistant.AssistantName != null)
                {
                    AssistantSought.AssistantName = UpdatedAsssistant.AssistantName;
                }
                if (UpdatedAsssistant.AssistantDescription != null)
                {
                    AssistantSought.AssistantDescription = UpdatedAsssistant.AssistantDescription;
                }
                
                Ctx.Assistants.Update(AssistantSought);
                Ctx.SaveChanges();
            }
        }
    }
}
