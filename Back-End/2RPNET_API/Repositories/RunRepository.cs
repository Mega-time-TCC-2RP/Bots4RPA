using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using System;
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

        public Run Create(int Id,Run DataRun)
        {
            DataRun.RunDate = DateTime.Now;
            DataRun.IdAssistant = Id;
            List<Run> listRun = ctx.Runs.Where(c => c.IdAssistant == DataRun.IdAssistant).ToList();
            if (listRun.Count() != 0)
            {
                List<Run> ListRuns = ctx.Runs.Where(c => c.IdAssistant == DataRun.IdAssistant).ToList();
                Run Obj = ListRuns.Last();
                DataRun.RunQuantity = Obj.RunQuantity + 1;
            }
            else
            {
                int RunQuantity;
                RunQuantity = 0;
                DataRun.RunQuantity = RunQuantity + 1;
            }
            
            ctx.Runs.Add(DataRun);
            ctx.SaveChanges();
            return DataRun;
        }

        public int ErrorQuantity(int IdAssistant)
        {
            return ctx.Runs.Where(r => r.RunStatus == false &&  r.IdAssistant == IdAssistant).Count();
        }

        public int SucessQuantity(int IdAssistant)
        {
            return ctx.Runs.Where(r => r.RunStatus == true && r.IdAssistant == IdAssistant).Count();
        }

        public int RunQuantity(int IdAssistant)
        {
            return ctx.Runs.Where(r => r.IdAssistant == IdAssistant).Count();
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


        public Run SearchAssistantByID(int IdAssistant)
        {
            //return ctx.Runs
            //     .FirstOrDefault(a => a.IdRun == IdAssistant);

            return ctx.Runs.FirstOrDefault(c => c.IdAssistant == IdAssistant);
        }
    }
}
