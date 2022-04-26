using _2rpnet.rpa.webAPI.Contexts;
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
    public class UserTypesControllerTest
    {

        [Fact]
        public void Must_Return_Ok_in_UserType_Read()
        {
            // Arrange
            var mockRepo = new Mock<IUserTypeRepository>();
            mockRepo.Setup(x => x.ReadAll());
            var controller = new UserTypesController(mockRepo.Object);

            // Act  
            var result = controller.ReadAll();

            // Assert  
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Must_Return_Ok_in_UserType_Searched_For_By_ID()
        {
            // Arrange
            var mockRepo = new Mock<IUserTypeRepository>();
            //var mockID = 1;
            //mockRepo.Setup(x => x.SearchByID(1));
            var controller = new UserTypesController(mockRepo.Object);

            // Act
            var result = controller.SearchByID(2);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
