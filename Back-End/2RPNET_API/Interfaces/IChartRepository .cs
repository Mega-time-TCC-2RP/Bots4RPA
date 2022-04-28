using _2RPNET_API.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Interfaces
{
    interface IChartRepository
    {
        List<Assistant> GraphicInformations(int IdAssistant);

        Assistant SearchByID(int IdAssistant);
    }
}
