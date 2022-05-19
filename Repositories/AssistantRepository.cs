﻿using _2RPNET_API.Context;
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
using _2RPNET_API.ViewModels;
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
                Ctx.Assistants.Add(NewAssistant);
                Ctx.SaveChanges();
        }

        public void Delete(int IdAssistant)
        {
            Assistant AssistantSought = SearchByID(IdAssistant);
            Ctx.Assistants.Remove(AssistantSought);
            Ctx.SaveChanges();
        }

        public async Task EnviaEmail(int idAssistant, SendEmailViewModel emailConfig)
        {
            
            Assistant assistantSought = SearchByID(idAssistant);
            //string userEmail = assistantSought.IdEmployeeNavigation.IdUserNavigation.Email;
            string userEmail = emailConfig.email;
            string FilePath = "C:\\Users\\50928811867.INFOSCS\\Desktop\\develop_manha\\Bots-4RPA\\Back-End\\2RPNET_API\\Templates\\Template.html";

            StreamReader streamreader = new StreamReader(FilePath);

            string MailText = streamreader.ReadToEnd();
            streamreader.Close();

            MailText = MailText.Replace("[assistant]", assistantSought.AssistantName);
            string caminhoImagem = @$"http://localhost:5000/StaticFiles/Images/Assistant{idAssistant}.png";
            MailText = MailText.Replace("[link]", "href=" + '"' + caminhoImagem + '"');

            if (userEmail != null)
            {
                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress("Grupo 2RP", "bots4rpa@gmail.com"));
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
                builder.Attachments.Add(@".\StaticFiles\Images\Assistant"+$"{idAssistant}"+".png");

                // Now we just need to set the message body and we're done
                message.Body = builder.ToMessageBody();

                SmtpClient client = new SmtpClient();

                
                    client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    client.Authenticate("bots4rpa@gmail.com", "Grupo8_manha");
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
                message.From.Add(new MailboxAddress("Grupo 2RP", "bots4rpa@gmail.com"));
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
                client.Authenticate("bots4rpa@gmail.com", "Grupo8_manha");
                await client.SendAsync(message);
                client.Disconnect(true);
                client.Dispose();

            }

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