using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Utils;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class UserNameRepository : IUserNameRepository
    {
        private readonly DoisRPnetContext ctx;

        public UserNameRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public UserName Create(UserName datauser)
        {
            if (datauser.Passwd != null)
            {
                datauser.Passwd = Crypt.GenerateHash(datauser.Passwd);
            }
            ctx.UserNames.Add(datauser);
            ctx.SaveChanges();

            return datauser;
        }

        public void Delete(UserName datauser)
        {
            ctx.UserNames.Remove(datauser);
            ctx.SaveChangesAsync();
        }

        public IEnumerable<UserName> ReadAll()
        {
            return ctx.UserNames.Select(user => new UserName()
            {
                IdUser = user.IdUser,
                UserName1 = user.UserName1,
                Email = user.Email,
                Cpf = user.Cpf,
                PhotoUser = user.PhotoUser,
                Phone = user.Phone,
                BirthDate = user.BirthDate,
                Rg = user.Rg,
                UserValidation = user.UserValidation,
                Employees = user.Employees.Select(E => new Employee()
                {
                    IdEmployee = E.IdEmployee,
                    Confirmation = E.Confirmation,
                    IdUser = E.IdUser,
                    IdCorporation = E.IdCorporation,
                    IdOffice = E.IdOffice,
                    Players = E.Players.Select(P => new Player()
                    {
                        IdPlayer = P.IdPlayer,
                        Score = P.Score,
                        IdEmployee = P.IdEmployee
                    }).ToList()
                }).ToList()
            }).ToList();
        }

        public UserName SearchByID(int id)
        {
            return ctx.UserNames.Select(user => new UserName()
            {
                IdUser = user.IdUser,
                UserName1 = user.UserName1,
                Email = user.Email,
                Cpf = user.Cpf,
                PhotoUser = user.PhotoUser,
                Phone = user.Phone,
                BirthDate = user.BirthDate,
                Rg = user.Rg,
                UserValidation = user.UserValidation,
                Employees = user.Employees.Select(E => new Employee()
                {
                    IdEmployee = E.IdEmployee,
                    Confirmation = E.Confirmation,
                    IdUser = E.IdUser,
                    IdCorporation = E.IdCorporation,
                    IdOffice = E.IdOffice,
                    IdOfficeNavigation = E.IdOfficeNavigation,
                    Players = E.Players.Select(P => new Player()
                    {
                        IdPlayer = P.IdPlayer,
                        Score = P.Score,
                        IdEmployee = P.IdEmployee
                    }).ToList()
                }).ToList()
            }).ToList().FirstOrDefault(u => u.IdUser == id);
        }

        public UserName Update(UserName datauser)
        {
            if (SearchByID(datauser.IdUser) == null)
            {
                return null;
            }
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

        public UserName GetSkinsAndTrophiesByUser(int idUser)
        {
            return ctx.UserNames.Select(user => new UserName
            {
                IdUser = user.IdUser,
                Employees = user.Employees.Select(employee => new Employee()
                {
                    IdEmployee = employee.IdEmployee,
                    Players = employee.Players.Select(player => new Player() 
                    { 
                        IdPlayer = player.IdPlayer,
                        LibrarySkins = player.LibrarySkins.Select(ls => new LibrarySkin()
                        {
                            IdSkinNavigation = ls.IdSkinNavigation,
                            UnlockData = ls.UnlockData,
                        }).ToList(),
                        LibraryTrophies = player.LibraryTrophies.Select(lt => new LibraryTrophy() 
                        {
                            IdTrophyNavigation = lt.IdTrophyNavigation,
                            UnlockData = lt.UnlockData,
                        }).ToList()
                    }).ToList()
                }).ToList()
            }).FirstOrDefault(u => u.IdUser == idUser);
        }

        public void ValidateUser(UserName queryUser)
        {
            queryUser.UserValidation = true;
            ctx.UserNames.Update(queryUser);
            ctx.SaveChanges();
        }
    }
}
