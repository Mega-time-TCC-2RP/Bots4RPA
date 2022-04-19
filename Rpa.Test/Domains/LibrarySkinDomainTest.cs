using _2rpnet.rpa.webAPI.Domains;
using System;
using Xunit;

namespace Rpa.Test.Domains
{
    public class LibrarySkinDomainTest
    {
        [Fact]
        public void Must_Return_Employee()
        {
            // Arrange
            LibrarySkin skin = new LibrarySkin();
            skin.UnlockData = new DateTime(05 / 02 / 2022);

            // Act
            bool result = true;

            if (skin.UnlockData == null)
            {
                result = false;
            }
            // Assert
            Assert.True(result);
        }
    }
}
