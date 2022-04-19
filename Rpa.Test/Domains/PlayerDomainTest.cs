using _2rpnet.rpa.webAPI.Domains;
using Xunit;

namespace Rpa.Test.Domains
{
    public class PlayerDomainTest
    {
        [Fact]
        public void Must_Return_Player()
        {
            // Arrange
            Player player = new Player();
            player.Score = 23456;
            player.IdEmployee = 1;

            // Act
            bool result = true;

            if (player.Score == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
