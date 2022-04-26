﻿using _2rpnet.rpa.webAPI.Controllers;
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
    public class StatusQuestsControllerTest
    {
        [Fact]
        public void Must_Return_Ok_in_Status_Quest_Read()
        {
            // Arrange
            var mockRepo = new Mock<IStatusQuestRepository>();
            mockRepo.Setup(x => x.ReadAll());
            var controller = new StatusQuestsController(mockRepo.Object);

            // Act
            var result = controller.ReadAll();

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
