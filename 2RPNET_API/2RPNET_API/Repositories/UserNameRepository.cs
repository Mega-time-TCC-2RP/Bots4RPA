using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.Utils;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2RPNET_API.Repositories
{
    public class UserNameRepository : IUserNameRepository
    {
        private readonly RPAContext ctx;

        public UserNameRepository(RPAContext appContext)
        {
            ctx = appContext;
        }

        public UserName Create(UserName datauser)
        {
            ctx.UserNames.Add(datauser);
            ctx.SaveChangesAsync();

            return datauser;
        }

        public void Delete(UserName datauser)
        {
            ctx.UserNames.Remove(datauser);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<UserName> ReadAll()
        {
            return ctx.UserNames.ToList();
        }

        public UserName SearchByID(int id)
        {
            return ctx.UserNames.Find(id);
        }

        public UserName Update(UserName datauser)
        {
            ctx.Entry(datauser).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return datauser;
        }

        public UserName Login(string email, string password)
        {
            var user = ctx.UserNames.FirstOrDefault(u => u.Email == email);

            if (user.Passwd == null)
            {
                return user;
            }

            if (user != null)
            {
                if (Crypt.Validate(user.Passwd) == true)
                {
                    bool IsEncrypted = Crypt.Compare(password, user.Passwd);
                    if (IsEncrypted)
                        return user;
                }
                else
                {
                    EncryptPassword(user);
                    bool IsEncrypted = Crypt.Compare(password, user.Passwd);
                    if (IsEncrypted)
                        return user;
                }
            }

            return null;
        }

        public async void EncryptPassword(UserName _user)
        {
            _user.Passwd = Crypt.GenerateHash(_user.Passwd);
            ctx.UserNames.Update(_user);
            await ctx.SaveChangesAsync();
        }
    }
}
