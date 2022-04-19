using _2rpnet.rpa.webAPI.Domains;
using Xunit;

namespace Rpa.Test.Domains
{
    public class EmployeeDomainTest
    {
        [Fact]
        public void Must_Return_Employee()
        {
            // Arrange
            Employee employee = new Employee();
            employee.IdCorporation = 1;
            employee.IdOffice = 2;
            employee.IdUser = 3;
            employee.Confirmation = true;

            // Act
            bool result = true;

            if (employee.IdOffice == null)
            {
                result = false;
            }

            // Assert
            Assert.True(result);
        }
    }
}
