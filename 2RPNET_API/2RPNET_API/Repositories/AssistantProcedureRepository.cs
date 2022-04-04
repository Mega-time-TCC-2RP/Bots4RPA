using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace _2RPNET_API.Repositories
{
    public class AssistantProcedureRepository : IAssistantProcedureRepository
    {
        RPAContext ctx = new RPAContext();
        public void Create(AssistantProcedure newProcess)
        {
            ctx.AssistantProcedures.Add(newProcess);
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

        public void Update(int IdAssistantProcedure, AssistantProcedure updatedProcess)
        {
            AssistantProcedure SearchAssistant = SearchByID(IdAssistantProcedure);

            if (updatedProcess.ProcedureName != null && updatedProcess.ProcedureDescription != null)
            {
                updatedProcess.ProcedurePriority = updatedProcess.ProcedurePriority;
                updatedProcess.ProcedureName = updatedProcess.ProcedureName;
                updatedProcess.ProcedureDescription = updatedProcess.ProcedureDescription;
                updatedProcess.IdAssistant = updatedProcess.IdAssistant;
            }

            ctx.AssistantProcedures.Update(updatedProcess);

            ctx.SaveChanges();
        }
    }
}
