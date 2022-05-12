using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class WorkflowRepository : IWorkflowRepository
    {
        private readonly DoisRPnetContext ctx;

        public WorkflowRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }
        public void ChangeStatus(Workflow workflow, int IdStatus)
        {
            workflow.IdStatus = IdStatus;
            ctx.Workflows.Update(workflow);
            ctx.SaveChanges();
        }

        public Workflow Create(Workflow workflow)
        {
            ctx.Workflows.Add(workflow);
            return workflow;
        }

        public void Delete(Workflow workflow)
        {
            ctx.Workflows.Remove(workflow);
            ctx.SaveChanges();
        }

        public IEnumerable<Workflow> ReadAll()
        {
            return ctx.Workflows.AsNoTracking().Include(W => W.Quests).ToList();
        }

        public Workflow SearchByID(int id)
        {
            return ctx.Workflows.AsNoTracking().Include(W => W.Quests).ToList().FirstOrDefault(W => W.IdWorkflow == id);
        }

        public Workflow Update(Workflow workflow)
        {
            Workflow queryWorkflow = SearchByID(workflow.IdWorkflow);
            if (workflow == null)
            {
                return null;
            }
            workflow.IdEmployee = queryWorkflow.IdEmployee;
            ctx.Entry(workflow).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return SearchByID(workflow.IdWorkflow);
        }
    }
}