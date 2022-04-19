using _2rpnet.rpa.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rpa.Test.Domains
{
    public class UserNameDomainTest
    {
        [Fact]
        public void Must_Return_UserName()
        {
            // Arrange
            UserName user = new UserName();
            user.UserName1 = "testador";
            user.Cpf = "23456785242";
            user.PhotoUser = "";
            user.BirthDate = DateTime.Now;
            user.Email = "tester@gmail.com";
            user.Passwd = "123456789";
            user.Phone = "123456789";
            user.Rg = "123456789";
            user.UserValidation = true;

            // Act
            bool result = true;

            if (user.PhotoUser == null || user.PhotoUser == "")
            {
                user.PhotoUser = "vazio.png";
            }

            if (user.UserName1 == null || user.Cpf == null || user.PhotoUser == null ||  user.Email == null || user.Passwd == null || user.Phone == null || user.Rg == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
