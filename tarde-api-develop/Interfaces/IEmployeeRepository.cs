using _2rpnet.rpa.webAPI.Domains;
using System.Collections.Generic;

namespace _2rpnet.rpa.webAPI.Interfaces
{
    public interface IEmployeeRepository
    {
        Employee Create(Employee employee);
        IEnumerable<Employee> ReadAll();
        Employee Update(Employee employee);
        void Delete(Employee employee);
        Employee SearchByID(int id);
    }
}
