using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Utils;
using _2rpnet.rpa.webAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserNamesController : ControllerBase
    {
        // Vincular a Context
        private readonly IUserNameRepository ctx;
        private readonly IEmployeeRepository Ectx;
        private readonly ICorporationRepository Cctx;
        private readonly IPlayerRepository Pctx;
        private readonly IOfficeRepository Octx;
        private readonly IPostRepository PostCtx;
        private readonly ILibrarySkinRepository LSctx;
        private readonly ILibraryTrophyRepository LTctx;

        public UserNamesController(IUserNameRepository context, IEmployeeRepository contextEmployee, ICorporationRepository contextCorporation, IPlayerRepository contextPlayer, IOfficeRepository contextOffice, IPostRepository contextPost, ILibrarySkinRepository contextLibrarySkin, ILibraryTrophyRepository contextLibraryTrophy)
        {
            ctx = context;
            Ectx = contextEmployee;
            Cctx = contextCorporation;
            Pctx = contextPlayer;
            Octx = contextOffice;
            PostCtx = contextPost;
            LSctx = contextLibrarySkin;
            LTctx = contextLibraryTrophy;
        }

        // Metodo GET - Listagem
        [HttpGet]
        public IActionResult ReadAll()
        {
            return Ok(ctx.ReadAll());
        }

        // Metodo GET por ID - Procurar pela ID
        //[HttpGet("{id}")]
        //[Authorize(Roles = "1,2,3")]
        //public IActionResult SearchByID(int id)
        //{
        //    var userName = ctx.SearchByID(id);

        //    if (userName == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(userName);
        //}

        // Metodo PUT - Atualizacao
        [HttpPut]
        [Authorize(Roles = "2,3")]
        public IActionResult Update([FromForm] UserUpdateViewModel user, IFormFile File)
        {
            try
            {
                UserName putUser = new UserName();
                Employee putEmployee = new Employee();
                putUser.IdUser = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, FileTypes);

                if (File != null)
                {
                    if (Octx.SearchByID(user.IdOffice) == null) 
                    {
                        return BadRequest("Id do cargo inválido");
                    }
                    if ( Cctx.SearchByID(user.IdCorporation) == null )
                    {
                        return BadRequest("Id da empresa inválido");
                    }

                    if (UploadResult == "")
                    {
                        return BadRequest("Arquivo não encontrado");
                    }

                    if (UploadResult == "Extensão não permitida")
                    {
                        return BadRequest("Extensão de arquivo não permitida");
                    }   
                }
                var QueryUser = ctx.SearchByID(Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value));
                if(File != null)
                    putUser.PhotoUser = UploadResult;

                if(QueryUser == null)
                {
                    Upload.RemoveFile(putUser.PhotoUser);
                    return NotFound();
                }
                else
                {
                    if (QueryUser.GoogleId == null && (user.Passwd == null || user.Email == null))
                    {
                        Upload.RemoveFile(putUser.PhotoUser);
                        return BadRequest("O usuário sem login no google deve inserir uma nova senha e email");
                    }
                    else if (QueryUser.GoogleId != null)
                    {
                        putUser.BirthDate = user.BirthDate;
                        putUser.Cpf = user.Cpf;
                        putUser.Email = QueryUser.Email;
                        putUser.GoogleId = QueryUser.GoogleId;
                        putUser.IdUser = QueryUser.IdUser;
                        putUser.IdUserType = QueryUser.IdUserType;
                        putUser.Phone = user.Phone;
                        if (File != null)
                            putUser.PhotoUser = UploadResult;
                        else
                            putUser.PhotoUser = "padrao.png";
                        putUser.Rg = user.Rg;
                        putUser.UserName1 = user.UserName1;
                        putUser.UserValidation = putUser.UserValidation;

                        putEmployee.IdEmployee = QueryUser.Employees.First().IdEmployee;
                        putEmployee.IdCorporation = user.IdCorporation;
                        if (user.IdCorporation != QueryUser.Employees.First().IdCorporation)
                        {
                            putUser.UserValidation = false;
                        }
                        putEmployee.IdOffice = user.IdOffice;
                        putEmployee.IdUser = QueryUser.IdUser;
                    }
                    else
                    {
                        putUser.BirthDate = user.BirthDate;
                        putUser.Cpf = user.Cpf;
                        putUser.Email = user.Email;
                        putUser.Passwd = user.Passwd;
                        putUser.IdUser = QueryUser.IdUser;
                        putUser.IdUserType = QueryUser.IdUserType;
                        putUser.Phone = user.Phone;
                        if (File != null)
                            putUser.PhotoUser = UploadResult;
                        else
                            putUser.PhotoUser = "padrao.png";
                        putUser.Rg = user.Rg;
                        putUser.UserName1 = user.UserName1;
                        putUser.UserValidation = putUser.UserValidation;

                        putEmployee.IdEmployee = QueryUser.Employees.First().IdEmployee;
                        putEmployee.IdCorporation = user.IdCorporation;
                        if (user.IdCorporation != QueryUser.Employees.First().IdCorporation)
                        {
                            putUser.UserValidation = false;
                        }
                        putEmployee.IdOffice = user.IdOffice;
                        putEmployee.IdUser = QueryUser.IdUser;
                    }
                    if (QueryUser.PhotoUser != "padrao.png") 
                        Upload.RemoveFile(QueryUser.PhotoUser);
                    ctx.Update(putUser);
                    Ectx.Update(putEmployee);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet("GetMe")]
        [Authorize(Roles ="1,2,3")]
        public IActionResult GetMyData()
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                UserName user = ctx.SearchByID(UserId);

                if (user == null)
                {
                    return NotFound();
                }

                return Ok(user);
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [HttpPost]
        public IActionResult Post([FromForm] PostUserViewModel user, IFormFile File)
        {
            try
            {
                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, FileTypes);
                if (File != null)
                {
                    if (UploadResult == "")
                    {
                        return BadRequest("Arquivo não encontrado");
                    }

                    if (UploadResult == "Extensão não permitida")
                    {
                        return BadRequest("Extensão de arquivo não permitida");
                    }
                }
                else
                {
                    UploadResult = null;
                }
                if (user.Passwd == null)
                {
                    if (File != null)
                    {
                        Upload.RemoveFile(UploadResult);
                    }
                    return BadRequest("Senhas nulas só são aceitas no primeiro acesso com o google");
                }
                if(user.IdUserType == 1)
                {
                    if (File != null)
                    {
                        Upload.RemoveFile(UploadResult);
                    }
                    return Forbid("Apenas usuários comuns ou com nível de administração interna (empresa) podem ser cadastrados");
                }
                else if (Octx.ReadAll().FirstOrDefault(O => O.IdOffice == user.IdOffice) == null)
                {
                    if (File != null)
                    {
                        Upload.RemoveFile(UploadResult);
                    }
                    return NotFound("Cargo inválido");
                }
                else
                if (Cctx.SearchByID(user.IdCorporation) != null)
                {
                    UserName PostUser = new UserName()
                    {
                        UserName1 = user.UserName1,
                        Passwd = user.Passwd,
                        Email = user.Email,
                        Cpf = user.Cpf,
                        PhotoUser = UploadResult,
                        Phone = user.Phone,
                        Rg = user.Rg,
                        IdUserType = user.IdUserType,
                        UserValidation = false,
                        BirthDate = user.BirthDate
                    };
                    UserName PostedUser = ctx.Create(PostUser);
                    Employee PostEmployee = new Employee()
                    {
                        IdUser = PostedUser.IdUser,
                        IdCorporation = user.IdCorporation,
                        Confirmation = false
                    };

                    Employee PostedEmployee = Ectx.Create(PostEmployee);

                    if (user.IdUserType == 3)
                    {
                        Player PostPlayer = new()
                        {
                            IdEmployee = PostedEmployee.IdEmployee
                        };

                        Player PostedPlayer = Pctx.Create(PostPlayer);

                        return Created("UsuarioCriado", new
                        {
                            User = new UserName()
                            {
                                UserName1 = user.UserName1,
                                Email = user.Email,
                                Cpf = user.Cpf,
                                PhotoUser = UploadResult,
                                Phone = user.Phone,
                                Rg = user.Rg,
                                IdUserType = user.IdUserType,
                                UserValidation = false,
                                BirthDate = user.BirthDate
                            },
                            Employee = new Employee()
                            {
                                IdUser = PostedUser.IdUser,
                                IdCorporation = user.IdCorporation,
                                Confirmation = false
                            },
                            Player = new Player()
                            {
                                IdEmployee = PostedEmployee.IdEmployee
                            }
                        });
                    }
                    return Created("UsuarioCriado", new {
                        User = new UserName()
                        {
                            UserName1 = user.UserName1,
                            Email = user.Email,
                            Cpf = user.Cpf,
                            PhotoUser = UploadResult,
                            Phone = user.Phone,
                            Rg = user.Rg,
                            IdUserType = user.IdUserType,
                            UserValidation = false,
                            BirthDate = user.BirthDate
                        },
                        Employee = new Employee()
                        {
                            IdUser = PostedUser.IdUser,
                            IdCorporation = user.IdCorporation,
                            Confirmation = false
                        }
                    });
                }
                else return NotFound("Id da empresa inválido");
                }
                catch (Exception error)
                {
                    return BadRequest(error);
                    throw;
            }
        }

        // Metodo DELETE - Remocao
        [HttpDelete("{id}")]
        [Authorize(Roles = "1,2")]
        public IActionResult Delete(int id)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);

                var user = ctx.SearchByID(id);
                if (user == null)
                {
                    return NotFound();
                }
                if (ctx.SearchByID(UserId).Employees.First().IdCorporation != user.Employees.First().IdCorporation && UserRole == 2)
                {
                    return Forbid("O usuário administrador só pode deletar usuários da sua empresa");
                }
                if(user.PhotoUser != "padrao.png")
                {
                    Upload.RemoveFile(user.PhotoUser);
                }
                List<Employee> UserEmployee = Ectx.ReadAll().Where(E => E.IdEmployee == user.Employees.First().IdEmployee).ToList();
                UserEmployee.First().Players = Pctx.ReadAll().Where(P => P.IdEmployee == UserEmployee.First().IdEmployee).ToList();

                if (user.Employees.First().Players.Count == 1)
                {
                    List<Post> UserPosts = PostCtx.ReadAll().Where(Post => Post.IdPlayer == user.Employees.First().Players.First().IdPlayer).ToList();
                    List<LibrarySkin> UserSkins = LSctx.ReadAll().Where(LS => LS.IdPlayer == user.Employees.First().Players.First().IdPlayer).ToList();
                    List<LibraryTrophy> UserTrophies = LTctx.ReadAll().Where(LT => LT.IdPlayer == user.Employees.First().Players.First().IdPlayer).ToList();
                    UserEmployee.First().Players.First().Posts = UserPosts;
                    UserEmployee.First().Players.First().LibrarySkins = UserSkins;
                    UserEmployee.First().Players.First().LibraryTrophies = UserTrophies;
                }
                ctx.Delete(user);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpGet("MyTrophiesAndSkins")]
        [Authorize(Roles = "3")]
        public IActionResult GetTrophiesAndSkins()
        {
            try
            {
                return Ok(ctx.GetSkinsAndTrophiesByUser(Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value)));
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpPatch("Validate/{idUser}")]
        [Authorize(Roles = "2")]
        public IActionResult ValidateUser(int idUser)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "Role").Value);

                UserName QueryUser = ctx.SearchByID(idUser);
                if (ctx.SearchByID(UserId).Employees.First().IdCorporation != QueryUser.Employees.First().IdCorporation)
                {
                    return Forbid("O usuário administrador só pode validar usuários da sua empresa");
                }
                if (QueryUser == null)
                {
                    return NotFound("Id do usuário inválido");
                }
                else
                {
                    ctx.ValidateUser(QueryUser);
                    return NoContent();
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpGet("CheckValidation/{IdUser}")]
        public IActionResult CheckValidation(int IdUser)
        {
            try
            {
                if (ctx.SearchByID(IdUser) == null)
                {
                    return NotFound();
                }
                if (ctx.SearchByID(IdUser).UserValidation == true)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

    }
}
