using _2rpnet.rpa.webAPI.Controllers;
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
    public class PlayersControllerTest
    {
        [Fact]
        public void Must_Return_Ok_in_Player_Read()
        {
            // Arrange
            var mockRepo = new Mock<IPlayerRepository>();
            mockRepo.Setup(x => x.ReadAll());
            var controller = new PlayersController(mockRepo.Object);

            // Act
            var result = controller.ReadAll();
            
            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
