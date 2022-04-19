using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface ICommentRepository
    {
        Comment Create(Comment comment);
        List<Comment> ReadAll();
        Comment Update(Comment comment);
        void Delete(Comment comment);
        Comment SearchByID(int id);
    }
}
