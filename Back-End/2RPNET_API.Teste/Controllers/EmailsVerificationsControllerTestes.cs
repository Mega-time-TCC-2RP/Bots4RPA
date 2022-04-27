using _2RPNET_API.Controllers;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace _2RPNET_API.Teste.Controllers
{
        public class EmailsVerificationsControllerTestes
        {
        [Fact]
        public void Should_Read_All_Emails()
        {
            var ListEmailsVerifications = new List<EmailVerification>();

            var EmailVerification1 = new EmailVerification();
            EmailVerification1.IdEmailVerification = 1;
            EmailVerification1.IdAssistant = 1;
            EmailVerification1.Username = "Teste";
            EmailVerification1.UserPassword = "12345";
            EmailVerification1.Host = "12345678910";
            EmailVerification1.Gateway = "1234";
            EmailVerification1.Cryptography = "1234";


            ListEmailsVerifications.Add(EmailVerification1);
            var FakeRepository = new Mock<IEmailVerificationRepository>();
            FakeRepository.Setup(a => a.ReadAll()).Returns(ListEmailsVerifications);

            var Controller = new EmailsVerificationsController(FakeRepository.Object);


            var Resultado = Controller.ReadAll();


            Assert.IsType<OkObjectResult>(Resultado);
         }


        [Fact]
        public void Should_Create_Email()
        {
            var EmailVerification1 = new EmailVerification();
            EmailVerification1.IdEmailVerification = 1;
            EmailVerification1.IdAssistant = 1;
            EmailVerification1.Username = "Teste";
            EmailVerification1.UserPassword = "12345";
            EmailVerification1.Host = "12345678910";
            EmailVerification1.Gateway = "1234";
            EmailVerification1.Cryptography = "1234";

            var FakeRepository = new Mock<IEmailVerificationRepository>();
            FakeRepository.Setup(a => a.Create(EmailVerification1));

            var Controller = new EmailsVerificationsController(FakeRepository.Object);


            var Resultado = Controller.Create(EmailVerification1);


            Assert.IsType<StatusCodeResult>(Resultado);
        }

        [Fact]
        public void Should_Update_Email()
        {
            var EmailVerification1 = new EmailVerification();
            EmailVerification1.IdEmailVerification = 1;
            EmailVerification1.IdAssistant = 1;
            EmailVerification1.Username = "Testando";
            EmailVerification1.UserPassword = "54321";
            EmailVerification1.Host = "31223";
            EmailVerification1.Gateway = "4321";
            EmailVerification1.Cryptography = "57893";

            var FakeRepository = new Mock<IEmailVerificationRepository>();
            FakeRepository.Setup(a => a.Update(EmailVerification1.IdEmailVerification, EmailVerification1));

            var Controller = new EmailsVerificationsController(FakeRepository.Object);

            var Resultado = Controller.Update(EmailVerification1.IdEmailVerification, EmailVerification1);

            Assert.IsType<BadRequestResult>(Resultado);
        }
    }
}
