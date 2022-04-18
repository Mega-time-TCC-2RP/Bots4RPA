using _2RPNET_API.Controllers;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace _2RPNET_API.Teste.Controllers
{
    public class AssistantProcedureControllerTeste
    {
        [Fact]
        public void Deve_Listar_Os_Equipamentos()
        {
            var list_process = new List<AssistantProcedure>();

            var assis1 = new AssistantProcedure();
            assis1.IdAprocedure = 1;
            assis1.IdAssistant = 2;
            assis1.ProcedureName = "Teste";
            assis1.ProcedureDescription = "Testando os métodos";
            assis1.ProcedurePriority = 1;

            var assis2 = new AssistantProcedure();
            assis2.IdAprocedure = 2;
            assis2.IdAssistant = 1;
            assis2.ProcedureName = "Teste2";
            assis2.ProcedureDescription = "Testando os métodos parte 2";
            assis2.ProcedurePriority = 1;

            list_process.Add(assis1);
            list_process.Add(assis2);

            var fakerepository = new Mock<IAssistantProcedureRepository>();
            fakerepository.Setup(x => x.ReadAll()).Returns(list_process);

            var controller = new AssistantProcedureController(fakerepository.Object);


            var result = controller.ReadAll();


            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Deve_Listar_Um_Equipamento_Especifico()
        {
            var assis1 = new AssistantProcedure();
            assis1.IdAprocedure = 1;
            assis1.IdAssistant = 2;
            assis1.ProcedureName = "Teste";
            assis1.ProcedureDescription = "Testando os métodos";
            assis1.ProcedurePriority = 1;

            var fakerepository = new Mock<IAssistantProcedureRepository>();
            fakerepository.Setup(x => x.SearchByID(assis1.IdAprocedure)).Returns(assis1);

            var controller = new AssistantProcedureController(fakerepository.Object);


            var result = controller.SearchByID(assis1.IdAprocedure);


            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void Deve_Atualizar_Um_Equipamento()
        {
            var assis1 = new AssistantProcedure();
            assis1.IdAprocedure = 2;
            assis1.IdAssistant = 2;
            assis1.ProcedureName = "Testea";
            assis1.ProcedureDescription = "Testando os métodosa";
            assis1.ProcedurePriority = 1;

            var fakerepository = new Mock<IAssistantProcedureRepository>();
            fakerepository.Setup(x => x.Update(assis1.IdAprocedure, assis1));

            var controller = new AssistantProcedureController(fakerepository.Object);

            var result = controller.Update(assis1.IdAprocedure, assis1);

            Assert.IsType<StatusCodeResult>(result);
        }
        [Fact]
        public void Should_Create_Assistants()
        {
            var assis1 = new AssistantProcedure();
            assis1.IdAprocedure = 1;
            assis1.IdAssistant = 2;
            assis1.ProcedureName = "Teste";
            assis1.ProcedureDescription = "Testando os métodos";
            assis1.ProcedurePriority = 1;

            var FakeRepository = new Mock<IAssistantProcedureRepository>();
            FakeRepository.Setup(a => a.Create(assis1));

            var Controller = new AssistantProcedureController(FakeRepository.Object);


            var result = Controller.NewProcedure(assis1);


            Assert.IsType<StatusCodeResult>(result);
        }
    }
}
