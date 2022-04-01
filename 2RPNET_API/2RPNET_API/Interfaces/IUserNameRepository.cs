using _2RPNET_API.Domains;
using System.Collections.Generic;

namespace _2RPNET_API.Interfaces
{
    public interface IUserNameRepository
    {
        UserName Create(UserName datauser);
        IEnumerable<UserName> ReadAll();
        UserName Update(UserName datauser);
        void Delete(UserName datauser);
        UserName SearchByID(int id);
        UserName Login(string email, string password);
        void EncryptPassword(UserName _user);
    }
}
