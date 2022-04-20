using _2rpnet.rpa.webAPI.Domains;
using Xunit;

namespace Rpa.Test.Domains
{
    public class TrophyDomainTest
    {
        [Fact]
        public void Must_Return_Trophy()
        {
            // Arrangee
            Trophy trophy = new Trophy();
            trophy.TrophyImage = null;
            trophy.TrophyDescription = "Ganha esta conquista quando realiza o teste com sucesso!";
            trophy.Title = "Beta Tester!";

            // Act
            bool result = true;

            if (trophy.TrophyImage == "" || trophy.TrophyImage == null)
            {
                trophy.TrophyImage = "vazio.png";
            }

            if (trophy.TrophyDescription == null || trophy.Title == null || trophy.TrophyImage == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
