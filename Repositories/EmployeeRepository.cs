using _2rpnet.rpa.webAPI.Contexts;
using _2rpnet.rpa.webAPI.Domains;
using _2rpnet.rpa.webAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace _2rpnet.rpa.webAPI.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DoisRPnetContext ctx;

        public EmployeeRepository(DoisRPnetContext appContext)
        {
            ctx = appContext;
        }

        public Employee Create(Employee employee)
        {
            ctx.Employees.Add(employee);
            ctx.SaveChanges();

            return employee;
        }

        public void Delete(Employee employee)
        {
            ctx.Employees.Remove(employee);
            ctx.SaveChanges();
        }

        public IEnumerable<Employee> ReadAll()
        {
            return ctx.Employees.Include(E => E.Players).ToList();
        }

        public Employee SearchByID(int id)
        {
            return ctx.Employees.Include(E => E.Players).AsNoTracking().ToList().FirstOrDefault(e => e.IdEmployee == id);
        }

        public Employee Update(Employee employee)
        {
            ctx.Entry(employee).State = EntityState.Modified;
            ctx.SaveChanges();

            return employee;
        }
    }
}
