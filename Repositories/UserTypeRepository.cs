using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class UserTypeRepository : IUserTypeRepository
    {
        private readonly DoisRPnetContext ctx;

        public UserTypeRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public IEnumerable<UserType> ReadAll()
        {
            return ctx.UserTypes.ToList();
        }

        public UserType SearchByID(int id)
        {
            return ctx.UserTypes.Find(id);
        }
    }
}
