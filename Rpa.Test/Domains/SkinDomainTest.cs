using _2rpnet.rpa.webAPI.Domains;
using Xunit;

namespace Rpa.Test.Domains
{
    public class SkinDomainTest
    {
        [Fact]
        public void Must_Return_Skin()
        {
            // Arrange
            Skin skin = new Skin();
            skin.SkinPrice = 23453;
            skin.SkinImages = null;
            skin.SkinDescription = "Compre a skin do homem-aranha!";
            skin.Title = "Skin do Homem-Aranha";

            // Act
            bool result = true;

            if (skin.SkinImages == null)
            {
                skin.SkinImages = "vazio.png";
            }
            
            if (skin.SkinDescription == null || skin.Title == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
