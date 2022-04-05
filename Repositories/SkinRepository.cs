using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class SkinRepository : ISkinRepository
    {
        private readonly DoisRPnetContext ctx;

        public SkinRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }
        public Skin Create(Skin skin)
        {
            ctx.Skins.Add(skin);
            ctx.SaveChangesAsync();

            return skin;
        }

        public void Delete(Skin skin)
        {
            ctx.Skins.Remove(skin);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<Skin> ReadAll()
        {
            return ctx.Skins.ToList();
        }

        public Skin SearchByID(int id)
        {
            return ctx.Skins.Find(id);
        }

        public Skin Update(Skin skin)
        {
            ctx.Entry(skin).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return skin;
        }
    }
}
