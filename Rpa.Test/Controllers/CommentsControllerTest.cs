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
            var mockRepo = new Mock<ICommentRepository>();
            mockRepo
                .Setup(x => x.Create()))
                .Returns((Comment)null);

            var fakeDomain = new Comment();
            fakeDomain.IdPost = 1;
            fakeDomain.Title = "teste@gmail.com";
            fakeDomain.CommentDescription = "TesteT3ste";
            fakeDomain.DataComment = DateTime.Now;

            var controller = new CommentsController(mockRepo.Object);
        }

        [Fact]
        public void Must_Return_Comment_Read()
        {
            // Arrange
            var mockRepo = new Mock<ICommentRepository>();
            mockRepo
                .Setup(x => x.ReadAll());

            var controller = new CommentsController();

            // Act
            var result = controller.ControllerContext();

            // Assert
            Assert.IsType<OkObjectResult>(result);
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
