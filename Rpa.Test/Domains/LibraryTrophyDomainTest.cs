using _2rpnet.rpa.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rpa.Test.Domains
{
    public class LibraryTrophyDomainTest
    {
        [Fact]
        public void Must_Return_Library_Trophy()
        {
            // Arrange
            LibraryTrophy libraryTro = new LibraryTrophy();
            libraryTro.UnlockData = new DateTime(05 / 02 / 2022); 

            // Act
            bool result = true;

            if (libraryTro.UnlockData == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);

        }
    }
}
