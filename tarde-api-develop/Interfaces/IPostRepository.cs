using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IPostRepository
    {
        Post Create(Post post);
        IEnumerable<Post> ReadAll();
        Post Update(Post post);
        void Delete(Post post);
        Post SearchByID(int id);
        List<Post> GetHighlightedPosts();
        List<Post> GetByUser(int userId);
    }
}
