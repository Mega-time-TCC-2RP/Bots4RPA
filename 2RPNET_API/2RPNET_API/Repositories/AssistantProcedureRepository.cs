using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
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
            return ctx.AssistantProcedures.FirstOrDefault(c => c.IdAssistantProcedure == IdAssistantProcedure);
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
    }
}
