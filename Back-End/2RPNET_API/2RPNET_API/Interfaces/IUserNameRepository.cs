using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IUserNameRepository
    {
        List<UserName> ReadAll();
        UserName Create(UserName NewUser);
        UserName Update(int IdAssistant, UserName UpdatedUser);
        void Delete(int IdUserName);
        void EncryptPassword(UserName _user);
        UserName SearchByID(int id);
        UserName Login(string email, string password);
    }
}
