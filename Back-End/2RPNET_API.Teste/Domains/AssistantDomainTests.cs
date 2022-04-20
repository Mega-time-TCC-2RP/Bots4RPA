using _2RPNET_API.Domains;
using System;
using Xunit;

namespace _2RPNET_API.Teste.Domains
{
    public class AssistantDomainTests
    {
        [Fact]
        public void ShouldReturnAListOfAssistants()
        {

            //Pre - condiçao / Arrange
            Assistant assistant = new Assistant();
            assistant.IdEmployee = 1;
            assistant.CreationDate = Convert.ToDateTime("2022-01-01 00:00:00");
            assistant.AlterationDate = Convert.ToDateTime("2022-04-20 00:00:00");
            assistant.AssistantName = "Fluxo de tabelas excel";
            assistant.AssistantDescription = "Criações de tabelas de excel";

            //Procedimento / Act

            bool Resultado = true;

            if (assistant.IdEmployee < 0 && assistant.CreationDate >= DateTime.Now && assistant.AlterationDate != DateTime.Now && assistant.AssistantName == null && assistant.AssistantDescription == null)
            {
                Resultado = false;
            }

            //Resultado esperado / Assert

            Assert.True(Resultado);

        }

    }
}
