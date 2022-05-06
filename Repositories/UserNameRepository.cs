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


        public UserName SearchByID(int id)
        {
            return ctx.UserNames.Find(id);
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

        public List<UserName> ReadAll()
        {
            return ctx.UserNames.Select(
                u => new UserName
                {
                    IdUser = u.IdUser,
                    UserName1 = u.UserName1,
                    Email = u.Email,
                    Cpf = u.Cpf,
                    PhotoUser = u.PhotoUser,
                    Phone = u.Phone,
                    BirthDate=u.BirthDate,
                    Rg = u.Rg,
                    UserValidation=u.UserValidation
                }
                    ).ToList();
        }

        public UserName Create(UserName NewUser)
        {
            ctx.UserNames.Add(NewUser);
            ctx.SaveChangesAsync();

            return NewUser;
        }

        public UserName Update(int IdAssistant, UserName UpdatedUser)
        {
            ctx.Entry(UpdatedUser).State = EntityState.Modified;
            ctx.SaveChangesAsync();

            return UpdatedUser;
        }

        public void Delete(int IdUserName)
        {
            UserName UserNameSought = SearchByID(IdUserName);
            ctx.UserNames.Remove(UserNameSought);
            ctx.SaveChanges();
        }
    }
}
