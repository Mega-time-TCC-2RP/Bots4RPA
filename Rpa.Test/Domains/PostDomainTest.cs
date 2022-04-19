using _2rpnet.rpa.webAPI.Domains;
using System;
using Xunit;

namespace Rpa.Test.Domains
{
    public class PostDomainTest
    {
        [Fact]
        public void Must_Return_Post()
        {
            // Arrange
            Post post = new Post();
            post.DataPost = new DateTime(05 / 02 / 2022);
            post.Title = "Russo cria um novo Workflow!";
            post.PostDescription = "Workflow funciona tinindo em qualquer lugar, em que você pode fazer qualquer coisa";
            post.PostImage = "padraoPost.png";

            // Act
            bool result = true;
            if (post.PostImage == null)
            {
                post.PostImage = "vazio.png";
            }

            if(post.DataPost == null || post.PostDescription == null || post.PostImage == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
