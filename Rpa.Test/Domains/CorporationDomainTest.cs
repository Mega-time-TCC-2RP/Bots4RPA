using _2rpnet.rpa.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rpa.Test.Domains
{
    public class CorporationDomainTest
    {
        [Fact]
        public void Must_Return_Corporation()
        {
            // Arrange
            Corporation corporate = new Corporation();
            corporate.AddressName = "Rua Socorro de Aparecida";
            corporate.Cnpj = "67546453657686";
            corporate.CorporateName = "Porra, Lucca!";
            corporate.CorporatePhoto = "padraoEmpresa.png";
            corporate.NameFantasy = "Lucca, Porra!";
            corporate.Phone = "123456789";
            // Act

            bool result = true;

            if (corporate.AddressName == null || corporate.CorporateName == null || corporate.NameFantasy == null || corporate.Phone == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
