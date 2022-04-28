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
    public class ChartRepository : IChartRepository
    {
        private readonly RPAContext Ctx;

        public ChartRepository()
        {
        }

        public ChartRepository(RPAContext appContext)
        {
            Ctx = appContext;
        }

        public List<Assistant> GraphicInformations(int IdAssistant)
        {
            //return Ctx.AssistantProcedures
            //    .Select(a => new AssistantProcedure
            //    {
            //        IdAprocedure = a.IdAprocedure,
            //        IdAssistant = a.IdAssistant,
            //        ProcedurePriority = a.ProcedurePriority,
            //        ProcedureName = a.ProcedureName,
            //        ProcedureDescription = a.ProcedureDescription,
            //        IdAssistantNavigation = new Assistant
            //        {
            //            CreationDate = a.IdAssistantNavigation.CreationDate,
            //            AlterationDate = a.IdAssistantNavigation.AlterationDate,
            //            AssistantName = a.IdAssistantNavigation.AssistantName,
            //            AssistantDescription = a.IdAssistantNavigation.AssistantDescription
            //        }
            //    }
            //    .Where(a => a.AssistantProcedure == IdAssistant || a.IdAssistantNaviogation.IdAssistant == IdAssistant)
            //    .ToList();

            List<Assistant> AssistantsList = Ctx.Assistants.Where(c => c.IdAssistant == IdAssistant).ToList();
            List<AssistantProcedure> AssistantProceduresList = Ctx.AssistantProcedures.Where(c => c.IdAssistant == IdAssistant).ToList();
            List<Run> RunList = Ctx.Runs.Where(c => c.IdAssistant == IdAssistant).ToList();
            return AssistantsList.ToList();
        }
        public Assistant SearchByID(int IdAssistant)
        {
            //return Ctx.Assistants
            //    .Include("IdAssistantProcedureNavigation")
            //    .Include("IdAssistantProcedureNavigation")
            //    .FirstOrDefault(a => a.IdAssistant == IdAssistant);

            return Ctx.Assistants
                //.Include(AssistantProcedure)
                //.Include(Run)
                .FirstOrDefault(a => a.IdAssistant == IdAssistant);
        }

        //List<Assistant> IChartRepository.GraphicInformations(int IdAssistant)
        //{
        //    throw new NotImplementedException();
        //}

        //    List<Assistant> IChartRepository.GraphicInformations(int IdAssistant)
        //    {
        //        throw new NotImplementedException();
        //    }

        //    Assistant IChartRepository.SearchByID(int IdAssistant)
        //    {
        //        throw new NotImplementedException();
        //    }
    }
}
