using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace _2RPNET_API.Repositories
{
    public class RunRepository : IRunRepository
    {
        private readonly RPAContext ctx;

        public RunRepository()
        {
        }

        public RunRepository(RPAContext appContext)
        {
            ctx = appContext;
        }

        public List<Run> AssistantList(int id)
        {
            return ctx.Runs.Where(r => r.IdAssistantNavigation.IdAssistant == id).ToList();
        }

        public Run Create(Run DataRun)
        {
            ctx.Runs.Add(DataRun);
            ctx.SaveChanges();
            return DataRun;
        }

        public List<Run> ErrorList()
        {
            for (int i = 0; i <= 0; i++)
            {

            }
            return ctx.Runs.Where(r => r.RunStatus == false).ToList();
        }


        public List<Run> ReadAll()
        {
            return ctx.Runs.ToList();
        }

        public List<Run> ReadById(int Id)
        {
            return ctx.Runs
                .Where(a => a.IdRun == Id)
                 .ToList();
        }

        public Run SearchByID(int Id)
        {
            return ctx.Runs
                 .FirstOrDefault(a => a.IdRun == Id);
        }
    }
}
