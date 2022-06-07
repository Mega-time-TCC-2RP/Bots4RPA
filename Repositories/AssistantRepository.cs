﻿using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class AssistantRepository : IAssistantRepository
    {
        private readonly DoisRPnetContext ctx;

        public AssistantRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }
        public List<Assistant> GetDagsInfo(int IdCorporation)
        {
            List<Assistant> dags = ctx.Assistants.Select(assistantDags => new Assistant()
            {
                AssistantName = assistantDags.AssistantName,
                Runs = assistantDags.Runs,
                CreationDate = assistantDags.CreationDate,
                IdEmployeeNavigation = new Employee()
                {
                    IdCorporation = assistantDags.IdEmployeeNavigation.IdCorporation,
                    IdUserNavigation = new UserName()
                    {
                        UserName1 = assistantDags.IdEmployeeNavigation.IdUserNavigation.UserName1,
                    }
                }
            }).ToList().FindAll(a => a.IdEmployeeNavigation.IdCorporation == IdCorporation);

            return dags;
        }

        public List<Assistant> GetDagsUserInfo(int IdEmployee)
        {
            List<Assistant> dags = ctx.Assistants.Select(assistantDags => new Assistant()
            {
                AssistantName = assistantDags.AssistantName,
                IdEmployee = assistantDags.IdEmployee,
                Runs = assistantDags.Runs,
                CreationDate = assistantDags.CreationDate,
                IdEmployeeNavigation = new Employee()
                {
                    IdCorporation = assistantDags.IdEmployeeNavigation.IdCorporation,
                    IdUserNavigation = new UserName()
                    {
                        UserName1 = assistantDags.IdEmployeeNavigation.IdUserNavigation.UserName1,
                    }
                }
            }).ToList().FindAll(a => a.IdEmployee == IdEmployee);

            return dags;
        }
    }
}
