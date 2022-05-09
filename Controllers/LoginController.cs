using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.Repositories;
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

        public LoginController(IUserNameRepository ctx)
        {
            _userRepository = ctx;
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
                    Unauthorized("Apenas usuários validados podem logar");
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
