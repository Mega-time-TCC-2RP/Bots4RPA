﻿using _2rpnet.rpa.webAPI.Domains;
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
            LibrarySkin librarySkin = new LibrarySkin();
            librarySkin.UnlockData = new DateTime(05 / 02 / 2022);

            // Act
            bool result = true;

            if (librarySkin.UnlockData == null)
            {
                result = false;
            }
            // Assert
            Assert.True(result);
        }
    }
}
