using _2RPNET_API.Controllers;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using Xunit;

namespace _2RPNET_API.Teste
{
    public class LoginControllerTeste
    {
        [Fact]
        public void Return_Invalid_User()
        {
            var fakerepository = new Mock<IUserNameRepository>();
            fakerepository.Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>())).Returns((UserName)null); 

            LoginViewModel data = new LoginViewModel();
            data.password = "123456789";
            data.email = "erick@gmail.com";

            var controller = new LoginController(fakerepository.Object);

            var result = controller.Login(data);

            Assert.IsType<Unauthorized.ObjectResult>(result);
        }
        [Fact]
        public void Return_Valid_User()
        {
            // Pré-Condição
            var usuarioFake = new UserName();

            usuarioFake.Email = "paulo@email.com";
            usuarioFake.Passwd = "$2a$11$eycMJdKymFm.f8m.Q65ePONimHnGEzv0Uu8pN.jhYz/rqy8g7Gp56";

            var fakerepository = new Mock<IUserNameRepository>();
            fakerepository.Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>())).Returns(usuarioFake); //Dessa maneira ele gera duas strings aleatorios para fazer a requisição e depois retorna um Usuario porém vazio.

            LoginViewModel dados = new LoginViewModel();
            dados.password = "$2a$11$eycMJdKymFm.f8m.Q65ePONimHnGEzv0Uu8pN.jhYz/rqy8g7Gp56";
            dados.email = "paulo@email.com";

            var controller = new LoginController(fakerepository.Object);

            //Procedimento
            var resultado = controller.Login(dados);


            //Resultado Esperado
            Assert.IsType<OkObjectResult>(resultado);

        }
    }
}
