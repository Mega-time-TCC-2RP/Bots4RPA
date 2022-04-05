using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DoisRPnetContext ctx;

        public CommentRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public Comment Create(Comment comment)
        {
            ctx.Comments.Add(comment);
            ctx.SaveChangesAsync();

            return comment;
        }

        public void Delete(Comment comment)
        {
            ctx.Comments.Remove(comment);
            ctx.SaveChangesAsync();
        }

        public List<Comment> ReadAll()
        {
            return ctx.Comments.ToList();
        }

        public Comment SearchByID(int id)
        {
            return ctx.Comments.AsNoTracking().ToList().FirstOrDefault(c => c.IdComment == id);
        }

        public Comment Update(Comment comment)
        {
            if (SearchByID(comment.IdComment) == null)
            {
                return null;
            }
            ctx.Entry(comment).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return comment;
        }
    }
}
