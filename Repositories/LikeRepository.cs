using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private readonly DoisRPnetContext ctx;

        public LikeRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public Like Create(Like like)
        {
            ctx.Likes.Add(like);
            ctx.SaveChangesAsync();

            return like;
        }

        public void Delete(Like like)
        {
            ctx.Likes.Remove(like);
            ctx.SaveChanges();
        }

        public IEnumerable<Like> ReadAll()
        {
            return ctx.Likes.ToList();
        }

        public Like SearchByID(int id)
        {
            return ctx.Likes.AsNoTracking().ToList().FirstOrDefault(l => l.IdLikes == id);
        }

        public Like Update(Like like)
        {
            ctx.Entry(like).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return like;
        }
    }
}
