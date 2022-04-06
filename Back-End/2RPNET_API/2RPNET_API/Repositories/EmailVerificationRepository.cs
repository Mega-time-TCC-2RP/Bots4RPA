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
            EmailVerification EmailVerificationSought = SearchByID(IdEmailVerification);
            Ctx.EmailVerifications.Remove(EmailVerificationSought);
            Ctx.SaveChanges();
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
            EmailVerification EmailVerificationSought = SearchByID(IdEmailVerification);

            if (UpdatedEmailVerification.IdAssistant > 0 && UpdatedEmailVerification.Username != null && UpdatedEmailVerification.UserPassword != null && UpdatedEmailVerification.Host != null && UpdatedEmailVerification.Gateway != null && UpdatedEmailVerification.Cryptography != null)
            {
                EmailVerificationSought.IdAssistant = UpdatedEmailVerification.IdAssistant;
                EmailVerificationSought.Username = UpdatedEmailVerification.Username;
                EmailVerificationSought.UserPassword = UpdatedEmailVerification.UserPassword;
                EmailVerificationSought.Host = UpdatedEmailVerification.Host;
                EmailVerificationSought.Gateway = UpdatedEmailVerification.Gateway;
                EmailVerificationSought.Cryptography = UpdatedEmailVerification.Cryptography;


                Ctx.EmailVerifications.Update(EmailVerificationSought);
                Ctx.SaveChanges();
            }
        }
    }
}
