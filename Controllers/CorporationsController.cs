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
    public class CorporationsController : ControllerBase
    {
        // Vincular a Context
        private readonly ICorporationRepository ctx;
        private readonly IEmployeeRepository Ectx;
        private readonly IUserNameRepository Uctx;
        private readonly IPlayerRepository Pctx;
        private readonly IOfficeRepository Octx;
        private readonly IPostRepository PostCtx;
        private readonly ILibrarySkinRepository LSctx;
        private readonly ILibraryTrophyRepository LTctx;

        public CorporationsController(ICorporationRepository context, IEmployeeRepository contextEmployee, IUserNameRepository contextUser, IPlayerRepository contextPlayer, IOfficeRepository contextOffice, IPostRepository contextPost, ILibrarySkinRepository contextLibrarySkin, ILibraryTrophyRepository contextLibraryTrophy)
        {
            ctx = context;
            Ectx = contextEmployee;
            Uctx = contextUser;
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
        //[Authorize(Roles = "1, 2, 3")]
        //public IActionResult SearchByID(int id)
        //{
        //    var corporation = ctx.SearchByID(id);

        //    if (corporation == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(corporation);
        //}

        // Metodo PUT - Atualizacao
        [HttpPut("{id}")]
        [Authorize(Roles = "1, 2")]
        public IActionResult Update(int id, [FromForm] Corporation corporate, IFormFile File)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);
                corporate.IdCorporation = id;

                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult = Upload.UploadFile(File, FileTypes);
                if (UploadResult == "" && File != null)
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (UploadResult == "Extensão não permitida" && File != null)
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                var QueryCorporation = ctx.SearchByID(id);
                if (QueryCorporation == null)
                {
                    Upload.RemoveFile(UploadResult);
                    return NotFound();
                }
                else if(UserRole == 2 && UserId != Ectx.ReadAll().Where(E => E.IdCorporation == QueryCorporation.IdCorporation).FirstOrDefault(E => E.Confirmation == true).IdUser){
                    Upload.RemoveFile(UploadResult);
                    return Forbid("Apenas o administrador dono da empresa pode alterar seus dados");
                }
                corporate.IdCorporation = id;
                if (File != null)
                {
                    corporate.CorporatePhoto = UploadResult;
                }
                else
                {
                    corporate.CorporatePhoto = "padraoEmpresa.png";
                }
                Upload.RemoveFile(QueryCorporation.CorporatePhoto);
                ctx.Update(corporate);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        // Metodo POST - Cadastro
        [HttpPost]
        public IActionResult Post([FromForm] PostCorporationViewModel corporateForm, IFormFile CorpPhoto, IFormFile CorpUser)
        {
            try
            {
                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string CorpUploadResult = Upload.UploadFile(CorpPhoto, FileTypes);
                string UserUploadResult = Upload.UploadFile(CorpUser, FileTypes);

                if (CorpUploadResult == "" && CorpPhoto != null)
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (CorpUploadResult == "Extensão não permitida" && CorpPhoto != null)
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }
                if (CorpPhoto == null)
                    CorpUploadResult = null;
                

                if (UserUploadResult == "" && CorpUser != null)
                {
                    Upload.RemoveFile(CorpUploadResult);
                    return BadRequest("Arquivo não encontrado");
                }

                if (UserUploadResult == "Extensão não permitida" && CorpUser != null)
                {
                    Upload.RemoveFile(CorpUploadResult);
                    return BadRequest("Extensão de arquivo não permitida");
                }
                if (CorpUser == null)
                {
                    UserUploadResult = null;
                }


                if (Octx.ReadAll().FirstOrDefault(O => O.IdOffice == corporateForm.IdOffice) == null)
                {
                    if(CorpUser != null)
                        Upload.RemoveFile(CorpUploadResult);
                    if(CorpUser != null)
                        Upload.RemoveFile(UserUploadResult);
                    return NotFound("Cargo inválido");
                }


                Corporation corporate = new Corporation()
                {
                    NameFantasy = corporateForm.NameFantasy,
                    CorporateName = corporateForm.CorporateName,
                    AddressName = corporateForm.AddressName,
                    Phone = corporateForm.CorpPhone,
                    Cnpj = corporateForm.Cnpj,
                    CorporatePhoto = CorpUploadResult
                };
                Corporation postedCorporate = ctx.Create(corporate);

                UserName ownerUser = new UserName()
                {
                    UserName1 = corporateForm.UserName1,
                    Email = corporateForm.Email,
                    Cpf = corporateForm.Cpf,
                    Phone = corporateForm.Phone,
                    BirthDate = corporateForm.BirthDate,
                    Rg = corporateForm.Rg,
                    UserValidation = false,
                    PhotoUser = UserUploadResult,
                    Passwd = corporateForm.Passwd,
                    IdUserType = 2
                };

                UserName postedUser = Uctx.Create(ownerUser);

                Employee ownerEmployee = new Employee()
                {
                    Confirmation = true,
                    IdUser = postedUser.IdUser,
                    IdCorporation = postedCorporate.IdCorporation,
                    IdOffice = corporateForm.IdOffice
                };

                Employee postedEmployee = Ectx.Create(ownerEmployee);

                return Ok(new { 
                    Corporation = postedCorporate,
                    UserOwner = postedUser,
                    UserEmployee = postedEmployee
                });
            }
            catch (Exception error)
            {
                BadRequest(error);
                throw;
            }
        }

        // Metodo DELETE - Remocao
        [Authorize(Roles = "1, 2")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);
                var corporate = ctx.SearchByID(id);
                if (corporate == null)
                {
                    return NotFound();
                }
                else if (Ectx.ReadAll().FirstOrDefault(E => E.IdCorporation == corporate.IdCorporation && E.Confirmation == true).IdUser != UserId && UserRole == 2)
                {
                    return Forbid("Apenas o administrador dono da empresa pode deletá-la");
                }
                List<Employee> employeeList = Ectx.ReadAll().Where(E => E.IdCorporation == corporate.IdCorporation).ToList();
                foreach (Employee item in employeeList)
                {
                    List<Post> UserPosts = PostCtx.ReadAll().Where(Post => Post.IdPlayer == Uctx.SearchByID(UserId).Employees.First().Players.First().IdPlayer).ToList();
                    List<LibrarySkin> UserSkins = LSctx.ReadAll().Where(LS => LS.IdPlayer == Uctx.SearchByID(UserId).Employees.First().Players.First().IdPlayer).ToList();
                    List<LibraryTrophy> UserTrophies = LTctx.ReadAll().Where(LT => LT.IdPlayer == Uctx.SearchByID(UserId).Employees.First().Players.First().IdPlayer).ToList();

                    foreach (var item2 in UserPosts)
                    {
                        PostCtx.Delete(item2);
                    }
                    foreach (var item2 in UserSkins)
                    {
                        LSctx.Delete(item2);
                    }
                    foreach (var item2 in UserTrophies)
                    {
                        LTctx.Delete(item2);
                    }
                    Pctx.Delete(item.Players.First());
                    Ectx.Delete(item);
                    Uctx.Delete(Uctx.SearchByID(item.IdUser));
                }
                Upload.RemoveFile(corporate.CorporatePhoto);
                ctx.Delete(corporate);

                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet("EmpresasInvalidas")]
        public IActionResult GetInvalidCorporations()
        {
            try
            {
                List<Corporation> Corps = ctx.ReadAll().ToList();
                List<Employee> CorpsOwners = Ectx.ReadAll().Where(E => E.Confirmation == true).ToList();
                foreach (var item in CorpsOwners)
                {
                    item.IdUserNavigation = Uctx.SearchByID(item.IdUser);
                }

                foreach (var item in Corps)
                {
                    item.Employees = CorpsOwners.Where(E => E.IdCorporation == item.IdCorporation).ToList();
                }

                return Ok(Corps.Where(C => C.Employees.First().IdUserNavigation.UserValidation == false));
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [Authorize(Roles = "2")]
        [HttpGet("UsuariosInvalidos")]
        public IActionResult GetInvalidUsers()
        {
            try
            {
                int UserId = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == JwtRegisteredClaimNames.Jti).Value);
                int UserRole = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(C => C.Type == "role").Value);

                List<Employee> CorpsEmployees = Ectx.ReadAll().Where(E => E.Confirmation != true).ToList();
                foreach (var item in CorpsEmployees)
                {
                    item.IdUserNavigation = Uctx.SearchByID(item.IdUser);
                }

                Corporation Corp = ctx.SearchByID(Ectx.SearchByID(Uctx.SearchByID(UserId).Employees.First().IdEmployee).IdCorporation);
                return Ok(CorpsEmployees.Where(E => E.IdUserNavigation.UserValidation == false && E.IdCorporation == Corp.IdCorporation));
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
    }
}
