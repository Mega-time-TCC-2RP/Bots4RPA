using _2rpnet.rpa.webAPI.Domains;
using System;
using Xunit;

namespace Rpa.Test.Domains
{
    public class QuestDomainTest
    {
        [Fact]
        public void Must_Return_Quest()
        {
            // Arrange
            Quest quest = new Quest();
            quest.DateHour = DateTime.Now;
            quest.DescriptionQuest = "Apagar o tweet";
            quest.IdStatus = 2;

            // Act
            bool result = true;

            if (quest.DateHour == null || quest.DescriptionQuest == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
