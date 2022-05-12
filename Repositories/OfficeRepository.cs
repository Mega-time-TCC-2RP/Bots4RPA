using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class OfficeRepository : IOfficeRepository
    {
        private readonly DoisRPnetContext ctx;

        public OfficeRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public Office Create(Office role)
        {
            ctx.Offices.Add(role);
            ctx.SaveChangesAsync();

            return role;
        }

        public void Delete(Office role)
        {
            ctx.Offices.Remove(role);
            ctx.SaveChanges();
        }

        public IEnumerable<Office> ReadAll()
        {
            return ctx.Offices.ToList();
        }

        public Office SearchByID(int id)
        {
            return ctx.Offices.Find(id);
        }

        public Office Update(Office role)
        {
            ctx.Entry(role).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return role;
        }
    }
}
