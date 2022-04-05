using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class CorporationRepository : ICorporationRepository
    {
        private readonly DoisRPnetContext ctx;

        public CorporationRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public Corporation Create(Corporation corporate)
        {
            ctx.Corporations.Add(corporate);
            ctx.SaveChangesAsync();

            return corporate;
        }

        public void Delete(Corporation corporate)
        {
            ctx.Corporations.Remove(corporate);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<Corporation> ReadAll()
        {
            return ctx.Corporations.ToList();
        }

        public Corporation SearchByID(int id)
        {
            return ctx.Corporations.AsNoTracking().ToList().FirstOrDefault(c => c.IdCorporation == id);
        }

        public Corporation Update(Corporation corporate)
        {
            if (SearchByID(corporate.IdCorporation) == null)
            {
                return null;
            }
            ctx.Entry(corporate).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return corporate;
        }
    }
}
