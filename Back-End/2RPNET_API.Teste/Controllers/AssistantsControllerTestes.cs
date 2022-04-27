using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;

namespace _2RPNET_API.Teste.Controllers
{
    public class AssistantsControllerTestes
    {
        [Fact]
        public void Should_Read_All_Assistants()
        {
            var ListAssisntans = new List<Assistant>();

            var Assistant1 = new Assistant();
            Assistant1.IdAssistant = 1;
            Assistant1.IdEmployee = 1;
            Assistant1.CreationDate = Convert.ToDateTime("1900-01-01");
            Assistant1.AlterationDate = Convert.ToDateTime("1900-01-01");
            Assistant1.AssistantName = "Fluxo de tabelas excel";
            Assistant1.AssistantDescription = "Criações de tabelas de excel";


            ListAssisntans.Add(Assistant1);
            var FakeRepository = new Mock<IAssistantRepository>();
            FakeRepository.Setup(a => a.ReadAll()).Returns(ListAssisntans);

            var Controller = new AssistantsController(FakeRepository.Object);


            var Resultado = Controller.ReadAll();


            Assert.IsType<OkObjectResult>(Resultado);

        }

        [Fact]
        public void Should_Read_My_Assistants() {

            var ListAssisntans = new List<Assistant>();

            var Assistant1 = new Assistant();
            Assistant1.IdAssistant = 1;
            Assistant1.IdEmployee = 1;
            Assistant1.CreationDate = Convert.ToDateTime("1900-01-01");
            Assistant1.AlterationDate = Convert.ToDateTime("1900-01-01");
            Assistant1.AssistantName = "Fluxo de tabelas excel";
            Assistant1.AssistantDescription = "Criações de tabelas de excel";

            var FakeRepository = new Mock<IAssistantRepository>();
            FakeRepository.Setup(a => a.SearchByID(Assistant1.IdAssistant)).Returns(Assistant1);

            var Controller = new AssistantsController(FakeRepository.Object);


            var Resultado = Controller.ReadMy(Assistant1.IdAssistant);


            Assert.IsType<OkObjectResult>(Resultado);
        }

        [Fact]
        public void Should_Create_Assistants()
        {
            var Assistant1 = new Assistant();
            Assistant1.IdAssistant = 1;
            Assistant1.IdEmployee = 1;
            Assistant1.CreationDate = DateTime.Now;
            Assistant1.AlterationDate = DateTime.Now;
            Assistant1.AssistantName = "Fluxo de tabelas excel";
            Assistant1.AssistantDescription = "Criações de tabelas de excel";

            var FakeRepository = new Mock<IAssistantRepository>();
            FakeRepository.Setup(a => a.Create(Assistant1));

            var Controller = new AssistantsController(FakeRepository.Object);


            var Resultado = Controller.Create(Assistant1);


            Assert.IsType<StatusCodeResult>(Resultado);
        }

        [Fact]
        public void Should_Update_Assistants()
        {
            var Assistant1 = new Assistant();
            Assistant1.IdAssistant = 2;
            Assistant1.IdEmployee = 1;
            Assistant1.CreationDate = DateTime.Now;
            Assistant1.AlterationDate = DateTime.Now;
            Assistant1.AssistantName = "tes";
            Assistant1.AssistantDescription = "sdfghjkls";

            var FakeRepository = new Mock<IAssistantRepository>();
            FakeRepository.Setup(a => a.Update(Assistant1.IdAssistant, Assistant1));

            var Controller = new AssistantsController(FakeRepository.Object);

            var Resultado = Controller.Update(Assistant1.IdAssistant, Assistant1);

            Assert.IsType<BadRequestResult>(Resultado);
        }
    }
}
