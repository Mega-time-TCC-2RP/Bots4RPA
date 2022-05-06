using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class StatusWorkflowRepository : IStatusWorkflowRepository
    {
        private readonly DoisRPnetContext ctx;

        public StatusWorkflowRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public StatusWorkflow Create(StatusWorkflow status)
        {
            ctx.StatusWorkflows.Add(status);
            ctx.SaveChangesAsync();

            return status;
        }

        public void Delete(StatusWorkflow status)
        {
            ctx.StatusWorkflows.Remove(status);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<StatusWorkflow> ReadAll()
        {
            return ctx.StatusWorkflows.ToList();
        }

        public StatusWorkflow SearchByID(int id)
        {
            return ctx.StatusWorkflows.Find(id);
        }

        public StatusWorkflow Update(StatusWorkflow status)
        {
            ctx.Entry(status).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return status;
        }
    }
}
