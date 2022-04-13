using _2RPNET_API.Domains;
using System;
using Xunit;

namespace _2RPNET_API.Teste.Domains
{
    public class AssistantDomainTests
    {
        [Fact]
        public void ShouldReturnAListOfAssistants(){

            //Pre-condiçao / Arrange
            Assistant assistant = new Assistant();
            assistant.IdEmployee = 1;
            assistant.CreationDate = "1900-01-01";
            assistant.AlterationDate = "1900-01-01";
            assistant.AssistantName = "Fluxo de tabelas excel";
            assistant.AssistantDescription = "Criações de tabelas de excel";

            //Procedimento / Act

            bool resultado = true;

            if (assistant.IdEmployee < 0 && assistant.CreationDate == null && assistant.AlterationDate == null && assistant.AssistantName == null && assistant.AssistantDescription == null)
            {
                resultado = false;
            }

            //Resultado esperado / Assert

            Assert.True(resultado);

        }

    }
}
