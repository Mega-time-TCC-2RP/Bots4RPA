using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2RPNET_API.Repositories
{
    public class AssistantProcedureRepository : IAssistantProcedureRepository
    {
        private readonly RPAContext ctx;

        public AssistantProcedureRepository()
        {
        }

        public AssistantProcedureRepository(RPAContext appContext)
        {
            ctx = appContext;
        }
        public void Create(AssistantProcedure NewProcess)
        {
            ctx.AssistantProcedures.Add(NewProcess);
            ctx.SaveChanges();
        }

        public void Delete(int IdAssitantProcedure)
        {
            AssistantProcedure SearchAssistant = SearchByID(IdAssitantProcedure);

            ctx.AssistantProcedures.Remove(SearchAssistant);

            ctx.SaveChanges();
        }

        public List<AssistantProcedure> ReadAll()
        {
            return ctx.AssistantProcedures.ToList();
        }

        public AssistantProcedure SearchByID(int IdAssistantProcedure)
        {
            return ctx.AssistantProcedures.FirstOrDefault(c => c.IdAprocedure == IdAssistantProcedure);
        }

        public void Update(int IdAssistantProcedure, AssistantProcedure NewProcess)
        {
            AssistantProcedure SearchAssistant = SearchByID(IdAssistantProcedure);

            if (NewProcess.ProcedureName != null && NewProcess.ProcedureDescription != null)
            {
                SearchAssistant.ProcedurePriority = NewProcess.ProcedurePriority;
                SearchAssistant.ProcedureName = NewProcess.ProcedureName;
                SearchAssistant.ProcedureDescription = NewProcess.ProcedureDescription;
                SearchAssistant.IdAssistant = NewProcess.IdAssistant;
            }

            ctx.AssistantProcedures.Update(SearchAssistant);

            ctx.SaveChanges();
        }

        public AssistantProcedure SearchByName(string ProcedureName)
        {
            return ctx.AssistantProcedures.FirstOrDefault(a => a.ProcedureName == ProcedureName);
        }

        public void ChangeVerification(string ProcedureName, ArrayViewModel ArrayViewModel)
        {

            AssistantProcedure AssistantSought = SearchByName(ProcedureName);
            // fazer verficação
            List<AssistantProcedure> ProceduresList = new List<AssistantProcedure>();

            if (AssistantSought != null)
            {
                foreach (var item in ProceduresList)
                {
                    if (item != null)
                    {
                        if (item.ProcedureName == ArrayViewModel.ProcedureName)
                        {
                            if (item.IdAssistant != AssistantSought.IdAssistant)
                            {
                                item.IdAssistant = AssistantSought.IdAssistant;
                            }

                            if (item.ProcedurePriority != ArrayViewModel.ProcedurePriority)
                            {
                                item.ProcedurePriority = ArrayViewModel.ProcedurePriority;
                            }

                            if (item.ProcedureDescription != ArrayViewModel.ProcedureDescription)
                            {
                                item.ProcedureDescription = ArrayViewModel.ProcedureDescription;
                            }

                            //if (item.ProcedureValue != ArrayViewModel.ProcedureValue)
                            //{
                            //    item.ProcedureValue = ArrayViewModel.ProcedureValue;
                            //} 

                            ctx.AssistantProcedures.Update(AssistantSought);
                        }
                    }
                }
            }
            else
            {
                ctx.AssistantProcedures.Add(AssistantSought);
            }
        }

    }
}
