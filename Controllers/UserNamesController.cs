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
        [HttpGet("{id}")]
        [Authorize(Roles = "1,2,3")]
        public IActionResult SearchByID(int id)
        {
            var userName = ctx.SearchByID(id);

            if (userName == null)
            {
                return NotFound();
            }

            return Ok(userName);
        }

        // Metodo PUT - Atualizacao
        [HttpPut]
        [Authorize(Roles = "3")]
        public IActionResult Update([FromForm] UserName user, IFormFile File)
        {
            try
            {
                user.IdUser = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                if (File == null)
                    return BadRequest("É necessário enviar um arquivo de imagem válido!");

                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, FileTypes);
                if (UploadResult == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (UploadResult == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                var QueryUser = ctx.SearchByID(Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value));
                user.PhotoUser = UploadResult;

                if(QueryUser == null)
                {
                    Upload.RemoveFile(user.PhotoUser);
                    return NotFound();
                }
                else
                {
                    Upload.RemoveFile(QueryUser.PhotoUser);
                    ctx.Update(user);
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

                        return Ok(new
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
                    return Ok(new {
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
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);

                var user = ctx.SearchByID(id);
                if (ctx.SearchByID(UserId).Employees.First().IdCorporation != user.Employees.First().IdCorporation && UserRole == 2)
                {
                    return Forbid("O usuário administrador só pode deletar usuários da sua empresa");
                }
                if (user == null)
                {
                    return NotFound();
                }
                Upload.RemoveFile(user.PhotoUser);
                List<Post> UserPosts = PostCtx.ReadAll().Where(Post => Post.IdPlayer == user.Employees.First().Players.First().IdPlayer).ToList();
                List<LibrarySkin> UserSkins = LSctx.ReadAll().Where(LS => LS.IdPlayer == user.Employees.First().Players.First().IdPlayer).ToList();
                List<LibraryTrophy> UserTrophies = LTctx.ReadAll().Where(LT => LT.IdPlayer == user.Employees.First().Players.First().IdPlayer).ToList();
                foreach (var item in UserPosts)
                {
                    PostCtx.Delete(item);
                }
                foreach (var item in UserSkins)
                {
                    LSctx.Delete(item);
                }
                foreach (var item in UserTrophies)
                {
                    LTctx.Delete(item);
                }
                Pctx.Delete(Pctx.SearchByID(Ectx.ReadAll().FirstOrDefault(e => e.IdUser == id).Players.First().IdPlayer));
                Ectx.Delete(Ectx.SearchByID(user.Employees.First().IdEmployee));
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

        [HttpGet("Validate/{idUser}")]
        [Authorize(Roles = "2")]
        public IActionResult ValidateUser(int idUser)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);

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
    }
}
