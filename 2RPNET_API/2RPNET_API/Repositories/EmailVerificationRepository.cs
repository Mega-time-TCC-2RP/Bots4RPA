using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Repositories
{
    public class EmailVerificationRepository : IEmailVerificationRepository
    {
        private readonly RPAContext Ctx;
        public EmailVerificationRepository(RPAContext appContext)
        {
            Ctx = appContext;
        }
        public void Create(EmailVerification NewEmailVerification)
        {
            Ctx.EmailVerifications.Add(NewEmailVerification);
            Ctx.SaveChanges();
        }

        public void Delete(int IdEmailVerification)
        {
            throw new NotImplementedException();
        }

        public List<EmailVerification> ReadAll()
        {
            return Ctx.EmailVerifications.ToList();
        }

        public EmailVerification SearchByID(int IdEmailVerification)
        {
            return Ctx.EmailVerifications
                .Include("IdAssistantNavigation")
                .FirstOrDefault(a => a.IdEmailVerification == IdEmailVerification);
        }

        public void Update(int IdEmailVerification, EmailVerification UpdatedEmailVerification)
        {
            throw new NotImplementedException();
        }
    }
}
