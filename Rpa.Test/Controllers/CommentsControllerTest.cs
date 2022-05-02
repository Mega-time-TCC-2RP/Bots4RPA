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
        public void Must_Return_Created_in_Comment_Create()
        {
            // Arrange
            var fakeDomain = new Comment();
            fakeDomain.IdPost = 1;
            fakeDomain.Title = "Testando Criar";
            fakeDomain.CommentDescription = "TesteT3ste";
            fakeDomain.DataComment = DateTime.Now;

            var mockRepo = new Mock<ICommentRepository>();
            mockRepo
                .Setup(x => x.Create(fakeDomain))
                .Returns((Comment)null);
            var mockEmployee = new Mock<IEmployeeRepository>();
            var mockUser = new Mock<IUserNameRepository>();
            var mockPlayer = new Mock<IPlayerRepository>();

            var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);

            // Act
            var result = controller.Post(fakeDomain);

            // Assert
            Assert.IsType<CreatedResult>(result);
        }

        [Fact]
        public void Must_Return_Ok_in_Comment_Read()
        {
            // Arrange            
            var mockRepo = new Mock<ICommentRepository>();
            mockRepo.Setup(x => x.ReadAll());
            var mockEmployee = new Mock<IEmployeeRepository>();
            var mockUser = new Mock<IUserNameRepository>();
            var mockPlayer = new Mock<IPlayerRepository>();

            var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);

            // Act
            var result = controller.ReadAll();

            // Assert
            Assert.IsType<OkObjectResult>(result);                        
        }

        [Fact]
        public void Must_Return_Ok_in_Comment_Searched_For_By_ID()
        {
            // Arrange
            Comment fakeComment = new Comment();
            fakeComment.IdComment = 1;

            var mockRepo = new Mock<ICommentRepository>();
            mockRepo
                .Setup(x => x.SearchByID(fakeComment.IdComment))
                .Returns(fakeComment);
            var mockEmployee = new Mock<IEmployeeRepository>();
            var mockUser = new Mock<IUserNameRepository>();
            var mockPlayer = new Mock<IPlayerRepository>();

            var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);

            // Act
            var result = controller.SearchByID(fakeComment.IdComment);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Must_Return_Not_Found_in_Comment_Searched_For_By_ID()
        {
            // Arrange
            var mockRepo = new Mock<ICommentRepository>();
            mockRepo
                .Setup(x => x.SearchByID(1)); 
            var mockEmployee = new Mock<IEmployeeRepository>();
            var mockUser = new Mock<IUserNameRepository>();
            var mockPlayer = new Mock<IPlayerRepository>();

            var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);

            // Act
            var result = controller.SearchByID(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Must_Return_Comment_Updated()
        {
            //Arrange
            //var fakeDomain = new Comment();
            //fakeDomain.IdComment = 1;
            //fakeDomain.IdPost = 1;
            //fakeDomain.IdPlayer = 1;
            //fakeDomain.Title = "Testando Atualizar";
            //fakeDomain.CommentDescription = "TesteT3ste";
            //fakeDomain.DataComment = DateTime.Now;

            //var mockRepo = new Mock<ICommentRepository>();
            //mockRepo
            //    .Setup(x => x.Update(fakeDomain))
            //    .Returns(fakeDomain);
            //var mockEmployee = new Mock<IEmployeeRepository>();
            //var mockUser = new Mock<IUserNameRepository>();
            //var mockPlayer = new Mock<IPlayerRepository>();

            //var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);
            //var postId = 2;

            //Act  
            //var existingPost = controller.SearchByID(postId);
            //var okResult = existingPost.Should().BeOfType<OkObjectResult>().Subject;
            //var result = okResult.Value.Should().BeAssignableTo<PostViewModel>().Subject;

            //var post = new Post();
            //post.Title = "Test Title 2 Updated";
            //post.Description = result.Description;
            //post.CategoryId = result.CategoryId;
            //post.CreatedDate = result.CreatedDate;

            //var updatedData = await controller.UpdatePost(post);

            //Assert  
            //Assert.IsType<OkResult>(updatedData);
            throw new NotImplementedException();
        }

        [Fact]
        public void Must_Return_Not_Found_in_Comment_Delete()
        {
            //Arrange
            Comment fakeComment = new Comment();
            fakeComment.IdComment = 1;

            var mockRepo = new Mock<ICommentRepository>();
            mockRepo
                .Setup(x => x.Delete(fakeComment));
            var mockEmployee = new Mock<IEmployeeRepository>();
            var mockUser = new Mock<IUserNameRepository>();
            var mockPlayer = new Mock<IPlayerRepository>();

            var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);

            //Act  
            var result = controller.Delete(fakeComment.IdComment);

            //Assert  
            Assert.IsType<NotFoundResult>(result);
        }
    }
}

//Arrange  
//var fakeDomain = new Comment();
//fakeDomain.IdComment = 1;
//fakeDomain.IdPost = 1;
//fakeDomain.IdPlayer = 1;
//fakeDomain.Title = "Testando Atualizar";
//fakeDomain.CommentDescription = "TesteT3ste";
//fakeDomain.DataComment = DateTime.Now;

//var mockRepo = new Mock<ICommentRepository>();
//mockRepo
//    .Setup(x => x.Update(fakeDomain))
//    .Returns(fakeDomain);
//mockRepo
//    .Setup(x => x.SearchByID(fakeDomain.IdComment))
//    .Returns(fakeDomain);
//var mockEmployee = new Mock<IEmployeeRepository>();
//var mockUser = new Mock<IUserNameRepository>();
//var mockPlayer = new Mock<IPlayerRepository>();

//var controller = new CommentsController(mockRepo.Object, mockEmployee.Object, mockUser.Object, mockPlayer.Object);


//Act  
//var result = controller.Update(fakeDomain.IdComment, fakeDomain);
//var existingComment = controller.SearchByID(fakeDomain.IdComment);
//var okResult = Assert.IsType<OkObjectResult>(existingComment);
//if (okResult) { }

//var fakeUpdate = new Comment();
//fakeUpdate.IdComment = 1;
//fakeUpdate.IdPost = 1;
//fakeUpdate.IdPlayer = 1;
//fakeUpdate.Title = "Test Title 2 Updated";
//fakeUpdate.CommentDescription = "Testando Update";
//fakeUpdate.DataComment = DateTime.Now;

//var result = controller.Update(fakeUpdate.IdComment, fakeUpdate);

//Assert  
//Assert.IsType<NoContentResult>(result);