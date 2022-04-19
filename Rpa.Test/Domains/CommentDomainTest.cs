using _2rpnet.rpa.webAPI.Domains;
using System;
using Xunit;

namespace Rpa.Test.Domains
{
    public class CommentDomainTest
    {
        [Fact]
        public void Deve_Retonar_Criado()
        {
            // Pré-Condição / Arrange
            Comment comment = new Comment();
            comment.CommentDescription = "Ideia muito lecal :)";
            comment.DataComment = new DateTime(05 / 02 / 2022);
            comment.Title = "Gostei do post sobre o novo Workflow!";


            // Procedimento / Act
            bool result = true;

            if (comment.CommentDescription == null || comment.DataComment == null || comment.Title == null)
            {
                result = false;
            }

            // Resultado Esperado / Assert
            Assert.True(result);
        }
    }
}
