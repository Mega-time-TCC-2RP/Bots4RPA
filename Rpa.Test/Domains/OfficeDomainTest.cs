using _2rpnet.rpa.webAPI.Domains;
using Xunit;

namespace Rpa.Test.Domains
{
    public class OfficeDomainTest
    {
        [Fact]
        public void Must_Return_Office()
        {
            // Arrange
            Office role = new Office();
            role.TitleOffice = "Funcionário 2RP net";

            // Act
            bool result = true;

            if (role.TitleOffice == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
