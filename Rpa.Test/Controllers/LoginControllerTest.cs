using Microsoft.AspNetCore.Mvc;
using Moq;
using _2rpnet.rpa.webAPI.Controllers;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using _2rpnet.rpa.webAPI.ViewModels;
using Xunit;

namespace _2rpnet.rpa.webAPI.Test.Controllers
{
    public class LoginControllerTests
    {
        [Fact]
        public void Must_Return_Invalid_User()
        {
            // Arrange
            var mockRepo = new Mock<IUserNameRepository>();
            mockRepo
                .Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>()))
                .Returns((UserName)null);

            var fakeViewModel = new LoginViewModel();
            fakeViewModel.email = "teste@gmail.com";
            fakeViewModel.password = "TesteT3ste";

            var controller = new LoginController(mockRepo.Object);

            // Act
            var result = controller.Login(fakeViewModel);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        [Fact]
        public void Must_Return_Valid_User()
        {
            // Arrange
            UserName fakeUser = new UserName();
            fakeUser.Email = "teste2@gmail.com";
            fakeUser.Passwd = "testinho";

            var mockRepo = new Mock<IUserNameRepository>();
            mockRepo
                .Setup(x => x.Login(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(fakeUser);

            var fakeViewModel = new LoginViewModel();
            fakeViewModel.email = "teste@gmail.com";
            fakeViewModel.password = "TesteT3ste";

            var controller = new LoginController(mockRepo.Object);

            // Act
            var result = controller.Login(fakeViewModel);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
