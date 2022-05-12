using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class TrophyRepository : ITrophyRepository
    {
        private readonly DoisRPnetContext ctx;

        public TrophyRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }
        
        public Trophy Create(Trophy trophy)
        {
            ctx.Trophies.Add(trophy);
            ctx.SaveChangesAsync();

            return trophy;
        }

        public void Delete(Trophy trophy)
        {
            ctx.Trophies.Remove(trophy);
            ctx.SaveChanges();
        }

        public IEnumerable<Trophy> ReadAll()
        {
            return ctx.Trophies.ToList();
        }

        public Trophy SearchByID(int id)
        {
            return ctx.Trophies.Find(id);
        }

        public Trophy Update(Trophy trophy)
        {
            ctx.Entry(trophy).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return trophy;
        }
    }
}
