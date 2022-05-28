using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Utils;
using Microsoft.EntityFrameworkCore;
using System;
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
            var dataUser = datauser;
            if (dataUser.IdUserType == 3)
            {
                foreach (var item in dataUser.Employees.First().Players.First().LibrarySkins)
                {
                    ctx.Entry(item).State = EntityState.Deleted;
                    ctx.SaveChanges();
                }
                foreach (var item in dataUser.Employees.First().Players.First().LibraryTrophies)
                {
                    ctx.Entry(item).State = EntityState.Deleted;
                    ctx.SaveChanges();
                }
                foreach (var item in dataUser.Employees.First().Players.First().Posts)
                {
                    foreach (var item2 in item.Comments)
                    {
                        ctx.Entry(item2).State = EntityState.Deleted;
                        ctx.SaveChanges();
                    }
                    foreach (var item2 in item.Likes)
                    {
                        ctx.Entry(item2).State = EntityState.Deleted;
                        ctx.SaveChanges();
                    }
                    ctx.Entry(item).State = EntityState.Deleted;
                    ctx.SaveChanges();
                }
                ctx.Entry(dataUser.Employees.First().Players.First()).State = EntityState.Deleted;
                ctx.SaveChanges();
            }
            ctx.Entry(dataUser.Employees.First()).State = EntityState.Deleted;
            ctx.SaveChanges();
            ctx.Entry(dataUser).State = EntityState.Deleted;
            ctx.SaveChanges();
        }

        public IEnumerable<UserName> ReadAll()
        {
            return ctx.UserNames.AsNoTracking().Select(user => new UserName()
            {
                IdUser = user.IdUser,
                UserName1 = user.UserName1,
                IdUserType = user.IdUserType,
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
                        
                        IdEmployee = P.IdEmployee
                    }).ToList()
                }).ToList()
            }).ToList();
        }

        public UserName SearchByID(int id)
        {
            return ctx.UserNames.AsNoTracking().Select(user => new UserName()
            {
                IdUser = user.IdUser,
                IdUserType = user.IdUserType,
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
            ctx.SaveChanges();

            return datauser;
        }

        public UserName Login(string email, string password)
        {
            var user = ctx.UserNames.Include(U => U.Employees).FirstOrDefault(u => u.Email == email);

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
            return ctx.UserNames.AsNoTracking().Select(user => new UserName
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
            queryUser.Passwd = ctx.UserNames.AsNoTracking().FirstOrDefault(U => U.IdUser == queryUser.IdUser).Passwd;
            ctx.UserNames.Update(queryUser);
            ctx.SaveChanges();
        }

        public UserName GoogleLogin(string googleId, string email)
        {
            var user = ctx.UserNames.Include(U=> U.Employees).FirstOrDefault(u => u.Email == email);

            if (user.Passwd == null)
            {
                return user;
            }

            if (user != null)
            {
                if (Crypt.Validate(user.GoogleId) == true)
                {
                    bool IsEncrypted = Crypt.Compare(googleId.ToString(), user.GoogleId);
                    if (IsEncrypted)
                        return user;
                }
                else
                {
                    EncryptGoogleId(user);
                    bool IsEncrypted = Crypt.Compare(googleId.ToString(), user.GoogleId);
                    if (IsEncrypted)
                        return user;
                }
            }

            return null;
        }

        public async void EncryptGoogleId(UserName _user)
        {
            _user.GoogleId = Crypt.GenerateHash(_user.GoogleId);
            ctx.UserNames.Update(_user);
            await ctx.SaveChangesAsync();
        }
    }
}
