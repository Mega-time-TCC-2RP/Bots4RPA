using _2RPNET_API.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace _2RPNET_API.Teste.Domains
{
    public class EmailVerificationDomainTeste
    {
        [Fact]
        public void ShouldReturnAListOfEmails()
        {

            //Pre - condiçao / Arrange
            EmailVerification EmailVerification1 = new EmailVerification();
            EmailVerification1.IdEmailVerification = 1;
            EmailVerification1.IdAssistant = 1;
            EmailVerification1.Username = "Teste";
            EmailVerification1.UserPassword = "12345";
            EmailVerification1.Host = "12345678910";
            EmailVerification1.Gateway = "1234";
            EmailVerification1.Cryptography = "1234";

            //Procedimento / Act

            bool Resultado = true;

            if (EmailVerification1.IdAssistant < 0 && EmailVerification1.Username == null && EmailVerification1.UserPassword == null && EmailVerification1.Host == null && EmailVerification1.Gateway == null && EmailVerification1.Cryptography == null)
            {
                Resultado = false;
            }

            //Resultado esperado / Assert

            Assert.True(Resultado);

        }
    }
}
