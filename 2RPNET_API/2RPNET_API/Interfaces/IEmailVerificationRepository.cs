using _2RPNET_API.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Interfaces
{
    interface IEmailVerificationRepository
    {
        List<EmailVerification> ReadAll();

        EmailVerification SearchByID(int IdEmailVerification);

        void Update(int IdEmailVerification, EmailVerification UpdatedEmailVerification);

        void Create(EmailVerification NewEmailVerification);

        void Delete(int IdEmailVerification);
    }
}
