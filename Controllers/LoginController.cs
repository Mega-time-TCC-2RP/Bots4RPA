using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Repositories;
using _2rpnet.rpa.webAPI.Utils;
using _2rpnet.rpa.webAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace _2rpnet.rpa.webAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly IUserNameRepository _userRepository;
        private readonly IOfficeRepository Octx;
        private readonly IEmployeeRepository Ectx;
        private readonly IPlayerRepository Pctx;
        private readonly ICorporationRepository Cctx;

        public LoginController(IUserNameRepository ctx, IOfficeRepository officeRepository, IEmployeeRepository employeeRepository, IPlayerRepository playerRepository, ICorporationRepository corporationRepository)
        {
            _userRepository = ctx;
            Octx = officeRepository;
            Ectx = employeeRepository;
            Pctx = playerRepository;
            Cctx = corporationRepository;
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel UserLogin)
        {
            try
            {
                UserName queryUser = _userRepository.Login(UserLogin.email, UserLogin.password);

                if (queryUser == null)
                {
                    return Unauthorized(new { msg = "Email ou senha inválidos!" });
                }

                if (queryUser.Passwd == null)
                {
                    return Unauthorized(new { msg = "Realize o login com o google!" });
                }

                if (queryUser.UserValidation == false)
                {
                    BadRequest(new { msg = "Apenas usuários validados podem logar" });
                }

                var tokenClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, queryUser.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, queryUser.IdUser.ToString()),
                    new Claim(ClaimTypes.Role, queryUser.IdUserType.ToString()),
                    new Claim("Role", queryUser.IdUserType.ToString()),
                    new Claim("dataExpiracao", DateTime.Now.AddDays(30).ToString()),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("2rp-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var myToken = new JwtSecurityToken(
                        issuer: "2rp.webAPI",
                        audience: "2rp.webAPI",
                        claims: tokenClaims,
                        expires: DateTime.Now.AddDays(30),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(myToken)
                });
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpPost("Google")]
        public IActionResult GoogleLogin(GoogleLoginViewModel LoginViewModel)
        {
            try
            {
                UserName queryUser = _userRepository.GoogleLogin(LoginViewModel.GoogleId, LoginViewModel.Email);

                if (queryUser == null)
                {
                    return NotFound(new { msg = "Primeiro acesso ainda não foi concluído" });
                }

                if (queryUser.UserValidation == false) { 
                    BadRequest(new { msg = "Apenas usuários validados podem logar" }); 
                }

                var tokenClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, queryUser.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, queryUser.IdUser.ToString()),
                    new Claim(ClaimTypes.Role, queryUser.IdUserType.ToString()),
                    new Claim("Role", queryUser.IdUserType.ToString()),
                    new Claim("dataExpiracao", DateTime.Now.AddDays(30).ToString()),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("2rp-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var myToken = new JwtSecurityToken(
                        issuer: "2rp.webAPI",
                        audience: "2rp.webAPI",
                        claims: tokenClaims,
                        expires: DateTime.Now.AddDays(30),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(myToken)
                });
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }

        [HttpPost("Google/FirstAccess")]
        public IActionResult GooglePost([FromForm] GoogleFirstAccesViewModel user, IFormFile File)
        {
            try
            {
     
                //UserName queryUser = _userRepository.GoogleLogin(user.GoogleId, user.Email);

                string[] FileTypes = { "jpg", "png", "jpeg", "gif" };
                string UploadResult ;
                if (File != null)
                {
                    UploadResult = Upload.UploadFile(File, FileTypes);
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
                if (user.IdUserType == 1)
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
                        GoogleId = user.GoogleId.ToString(),
                        Email = user.Email,
                        Cpf = user.Cpf,
                        PhotoUser = UploadResult,
                        Phone = user.Phone,
                        Rg = user.Rg,
                        IdUserType = user.IdUserType,
                        UserValidation = false,
                        BirthDate = user.BirthDate
                    };
                    UserName PostedUser = _userRepository.Create(PostUser);
                    Employee PostEmployee = new Employee()
                    {
                        IdUser = PostedUser.IdUser,
                        IdCorporation = user.IdCorporation,
                        Confirmation = false,
                        IdOffice = user.IdOffice
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
                                Confirmation = false,
                                IdOffice = user.IdOffice
                            },
                            Player = new Player()
                            {
                                IdEmployee = PostedEmployee.IdEmployee
                            }
                        });
                    }
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
                            Confirmation = false,
                            IdOffice = user.IdOffice
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


        [HttpPost("Google/FirstAccess/Corporation")]
        public IActionResult GoogleCorpPost(GoogleCorpFirstAccesViewModel corporateForm, IFormFile CorpPhoto, IFormFile CorpUser)
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
                    if (CorpUser != null)
                        Upload.RemoveFile(CorpUploadResult);
                    if (CorpUser != null)
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
                Corporation postedCorporate = Cctx.Create(corporate);

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
                    GoogleId = corporateForm.googleId,
                    IdUserType = 2
                };

                UserName postedUser = _userRepository.Create(ownerUser);

                Employee ownerEmployee = new Employee()
                {
                    Confirmation = true,
                    IdUser = postedUser.IdUser,
                    IdCorporation = postedCorporate.IdCorporation,
                    IdOffice = corporateForm.IdOffice
                };

                Employee postedEmployee = Ectx.Create(ownerEmployee);

                return Ok(new
                {
                    Corporation = postedCorporate,
                    UserOwner = postedUser,
                    UserEmployee = postedEmployee
                });
            }
            catch (Exception error)
            {
                return BadRequest(error);
                throw;
            }
        }
        //[HttpGet("{GoogleId}")]
        //public IActionResult GoogleLoginCheck(int GoogleId)
        //{
        //    try
        //    {
        //        if ()
        //        {

        //        }
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}

        //[HttpPost]
        //public IActionResult Login(LoginViewModel UserLogin)
        //{
        //    try
        //    {
        //        UserName queryUser = _userRepository.Login(UserLogin.email, UserLogin.password);

        //        if (queryUser == null)
        //        {
        //            return Unauthorized(new { msg = "Email ou senha inválidos!" });
        //        }

        //        if (queryUser.Passwd == null)
        //        {
        //            return Unauthorized(new { msg = "Realize o login com o google!" });
        //        }

        //        var tokenClaims = new[]
        //        {
        //            new Claim(JwtRegisteredClaimNames.Email, queryUser.Email),
        //            new Claim(JwtRegisteredClaimNames.Jti, queryUser.IdUser.ToString()),
        //            new Claim(ClaimTypes.Role, queryUser.IdUserType.ToString()),
        //            new Claim("Role", queryUser.IdUserType.ToString()),


        //        };

        //        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("2rp-chave-autenticacao"));

        //        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //        var myToken = new JwtSecurityToken(
        //                issuer: "2rp.webAPI",
        //                audience: "2rp.webAPI",
        //                claims: tokenClaims,
        //                expires: DateTime.Now.AddMinutes(30),
        //                signingCredentials: creds
        //            );

        //        return Ok(new
        //        {
        //            token = new JwtSecurityTokenHandler().WriteToken(myToken)
        //        });
        //    }
        //    catch (Exception error)
        //    {
        //        return BadRequest(error);
        //        throw;
        //    }
        //}
    }
}
