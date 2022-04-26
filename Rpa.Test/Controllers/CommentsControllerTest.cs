using _2rpnet.rpa.webAPI.Controllers;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rpa.Test.Controllers
{
    public class CommentsControllerTest
    {
        [Fact]
        public void Must_Return_Comment_Created()
        {
            // Arrange
            //var mockRepo = new Mock<ICommentRepository>();
            //mockRepo
            //    .Setup(x => x.Create()))
            //    .Returns((Comment)null);

            //var fakeDomain = new Comment();
            //fakeDomain.IdPost = 1;
            //fakeDomain.Title = "teste@gmail.com";
            //fakeDomain.CommentDescription = "TesteT3ste";
            //fakeDomain.DataComment = DateTime.Now;

            //var controller = new CommentsController(mockRepo.Object);
            throw new NotImplementedException();
        }

        [Fact]
        public void Must_Return_Comment_Read()
        {
            // Arrange
            var mockRepo = new Mock<ICommentRepository>();
            mockRepo.Setup(x => x.ReadAll());
            var mockEmployee = new Mock<IEmployeeRepository>();
            var mockUser = new Mock<IUserNameRepository>();
            var mockPlayer = new Mock<IPlayerRepository>();
            var controller = new CommentsController((ICommentRepository)mockRepo, (IEmployeeRepository)mockEmployee, (IUserNameRepository)mockUser, (IPlayerRepository)mockPlayer);

            // Act
            var result = controller.ReadAll();

            // Assert
            Assert.IsType<OkObjectResult>(result);

            // Arrange
            //var mockRepo = new Mock<ICommentRepository>();
            //mockRepo
            //    .Setup(x => x.ReadAll())
            //    .Returns(new List<Comment>());

            //var controller = new CommentsController(mockRepo.Object, mockRepo.Setups, mockRepo.Switches, mockRepo.Invocations);

            // Act
            //var result = controller.ControllerContext();

            // Assert
            //Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Must_Return_Comment_Searched_For_By_ID()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public void Must_Return_Comment_Updated()
        {
            throw new NotImplementedException();
        }

        [Fact]
        public void Must_Return_Comment_Deleted()
        {
            throw new NotImplementedException();
        }
    }
}
