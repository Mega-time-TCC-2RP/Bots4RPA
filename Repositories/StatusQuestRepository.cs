using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class StatusQuestRepository : IStatusQuestRepository
    {
        private readonly DoisRPnetContext ctx;

        public StatusQuestRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public StatusQuest Create(StatusQuest status)
        {
            ctx.StatusQuests.Add(status);
            ctx.SaveChangesAsync();

            return status;
        }

        public void Delete(StatusQuest status)
        {
            ctx.StatusQuests.Remove(status);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<StatusQuest> ReadAll()
        {
            return ctx.StatusQuests.ToList();
        }

        public StatusQuest SearchByID(int id)
        {
            return ctx.StatusQuests.Find(id);
        }

        public StatusQuest Update(StatusQuest status)
        {
            ctx.Entry(status).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return status;
        }
    }
}
