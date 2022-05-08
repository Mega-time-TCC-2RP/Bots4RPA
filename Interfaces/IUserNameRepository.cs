using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
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
        UserName GetSkinsAndTrophiesByUser(int idUser);
        void ValidateUser(UserName queryUser);
        int GoogleLogin(int googleId);
    }
}
