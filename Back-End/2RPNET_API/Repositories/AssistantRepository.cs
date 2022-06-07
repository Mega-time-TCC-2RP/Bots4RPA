using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using MailKit.Security;
using System.IO;

namespace _2RPNET_API.Repositories
{
    public class AssistantRepository : IAssistantRepository
    {
        private readonly RPAContext Ctx;

        public AssistantRepository()
        {
        }

        public AssistantRepository(RPAContext appContext)
        {
            Ctx = appContext;
        }

        public void Create(Assistant NewAssistant)
        {
            NewAssistant.CreationDate = DateTime.Now;
            NewAssistant.AlterationDate = DateTime.Now;
            Employee employeeAssistant = Ctx.Employees.ToList().FirstOrDefault(E => E.IdEmployee == NewAssistant.IdEmployee);
            Corporation employeeCorp = Ctx.Corporations.Include(C => C.Employees).ThenInclude(E => E.IdUserNavigation).FirstOrDefault(C => C.IdCorporation == employeeAssistant.IdCorporation);
            Ctx.Assistants.Add(NewAssistant);
            Ctx.SaveChanges();
            foreach (Employee item in employeeCorp.Employees)
            {
                if (item.IdUserNavigation.IdUserType == 2 || item.IdEmployee == NewAssistant.IdEmployee)
                {
                    LibraryAssistant LbAssistant = new()
                    {
                        IdAssistant = NewAssistant.IdAssistant,
                        IdEmployee = item.IdEmployee,
                        Nickname = NewAssistant.AssistantName,
                    };
                    Ctx.LibraryAssistants.Add(LbAssistant);
                    Ctx.SaveChanges();
                }
            }
        }

        public void Delete(int IdAssistant)
        {
            //Assistant SearchAssistant = SearchByID(IdAssistant);

            //Ctx.Assistants.Remove(SearchAssistant);

            //Ctx.SaveChanges();

           
            Assistant AssistantSought = Ctx.Assistants.FirstOrDefault(a => a.IdAssistant == IdAssistant);
            Ctx.Assistants.Remove(AssistantSought);
            //DELETA OS AQUIVOS DO ASSISTANT 
            string path = $"./StaticFiles/Files/AssistantProcess" + $"{IdAssistant}" + ".cs";
            // Create a file to write to.
            string pathRun = $"./Controllers/Assistant{IdAssistant}Controller.cs";

            if (File.Exists(path))
            {
                File.Delete(path);
            }
            if (File.Exists(pathRun))
            {
                File.Delete(pathRun);
            }
            Ctx.SaveChanges();
        }

        public async Task EnviaEmail(int idAssistant, SendEmailViewModel emailConfig)
        {
            Assistant assistantSought = SearchByID(idAssistant);
            //string userEmail = assistantSought.IdEmployeeNavigation.IdUserNavigation.Email;
            string userEmail = emailConfig.email;
            string FilePath = "./Templates/Template.html";

            StreamReader streamreader = new StreamReader(FilePath);

            string MailText = streamreader.ReadToEnd();
            streamreader.Close();

            MailText = MailText.Replace("[assistant]", assistantSought.AssistantName);
            string caminhoImagem = @$"http://vmbots4rpa.brazilsouth.cloudapp.azure.com:5000/StaticFiles/Images/Assistant{idAssistant}.png";
            MailText = MailText.Replace("[link]", "href=" + '"' + caminhoImagem + '"');

            if (userEmail != null)
            {
                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress("Bots 4 RPA", "bots4rpa@gmail.com"));
                message.To.Add(MailboxAddress.Parse(userEmail));
                message.Subject = $"Email do retorno do assistente {assistantSought.AssistantName}";
                var builder = new BodyBuilder();

                // Set the plain-text version of the message text
                //                builder.TextBody = @$"Codigo do email: { code},
                //O retorno do seu assistente { assistantSought.AssistantName}
                //                foi... { emailConfig.emailBody}
                //                ";
                builder.HtmlBody = MailText;


                // We may also want to attach a calendar event for Monica's party...
                //builder.Attachments.Add(@".\StaticFiles\Images\Assistant"+$"{idAssistant}"+".png");

                // Now we just need to set the message body and we're done
                message.Body = builder.ToMessageBody();

                SmtpClient client = new SmtpClient();


                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate("bots4rpa@gmail.com", "bllfapmicapcdsbk", default);
                await client.SendAsync(message);
                client.Disconnect(true);
                client.Dispose();

            }

        }

        public async Task EnviaEmail(SendEmailViewModel emailConfig)
        {
            //string userEmail = assistantSought.IdEmployeeNavigation.IdUserNavigation.Email;
            string userEmail = emailConfig.email;

            if (userEmail != null)
            {
                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress("Bots 4 RPA", "bots4rpa@gmail.com"));
                message.To.Add(MailboxAddress.Parse(userEmail));
                message.Subject = $"{emailConfig.emailTitle}";
                var builder = new BodyBuilder();

                // Set the plain-text version of the message text
                builder.TextBody = @$"{emailConfig.emailBody}";

                //builder.Attachments.Add(@".\StaticFiles\Images\Assistant" + $"{idAssistant}" + ".png");

                // Now we just need to set the message body and we're done
                message.Body = builder.ToMessageBody();

                SmtpClient client = new SmtpClient();


                client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                client.Authenticate("bots4rpa@gmail.com", "kiwxgcfzvuczefnp", default);
                await client.SendAsync(message);
                client.Disconnect(true);
                client.Dispose();

            }

        }

        public List<Assistant> FindByIdEmployee(int IdEmployee)
        {
            return Ctx.Assistants.Where(a => a.IdEmployee == IdEmployee).ToList();
        }

        public List<Assistant> ReadAll()
        {
            return Ctx.Assistants.ToList();
            //return Ctx.Assistants.Include(a => a.IdEmployeeNavigation).ToList();
        }

        public List<Assistant> ReadMyProcess(int IdUser)
        {
            return Ctx.Assistants
                .Where(a => a.IdAssistant == IdUser)
                 .ToList();
        }

        public Assistant SearchByID(int IdAssistant)
        {
            return Ctx.Assistants
                .FirstOrDefault(a => a.IdAssistant == IdAssistant);
        }

        public void Update(int IdAssistant, Assistant UpdatedAsssistant)
        {
            Assistant AssistantSought = SearchByID(IdAssistant);

            if (AssistantSought != null)
            {
                AssistantSought.AlterationDate = DateTime.Now;

                if (UpdatedAsssistant.IdEmployee > 0)
                {
                    AssistantSought.IdEmployee = UpdatedAsssistant.IdEmployee;
                }
                if (UpdatedAsssistant.AssistantName != null)
                {
                    AssistantSought.AssistantName = UpdatedAsssistant.AssistantName;
                }
                if (UpdatedAsssistant.AssistantDescription != null)
                {
                    AssistantSought.AssistantDescription = UpdatedAsssistant.AssistantDescription;
                }

                Ctx.Assistants.Update(AssistantSought);
                Ctx.SaveChanges();
            }
        }
    }
}
