﻿using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IRunRepository
    {
        Run Create(Run DataRun);
        List<Run> ReadAll();
        List<Run> ReadById(int Id);

        //List<Run> SearchByID(int IdAssistant);
        Run SearchByID(int Id);

        Run SearchAssistantByID(int IdAssistant);

        List<Run> ErrorList();
        List<Run> AssistantList(int id);

        void UpdateQuantity(int IdAssistant, Run UpdatedRun);
    }
}
