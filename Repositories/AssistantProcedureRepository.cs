using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.StaticFiles;
using Microsoft.Playwright;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace _2RPNET_API.Repositories
{
    public class AssistantProcedureRepository : IAssistantProcedureRepository
    {
        private readonly RPAContext ctx;

        public AssistantProcedureRepository()
        {
        }

        public AssistantProcedureRepository(RPAContext appContext)
        {
            ctx = appContext;
        }
        public void Create(AssistantProcedure NewProcess)
        {
            ctx.AssistantProcedures.Add(NewProcess);
            ctx.SaveChanges();
        }

        public void Delete(int IdAssitantProcedure)
        {
            AssistantProcedure SearchAssistant = SearchByID(IdAssitantProcedure);

            ctx.AssistantProcedures.Remove(SearchAssistant);

            ctx.SaveChanges();
        }

        public string ManipulateScript(int IdAssistant)
        {

            List<AssistantProcedure> AssistantProcedures = SearchByAssistant(IdAssistant);

            string path = $"./StaticFiles/Files/AssistantProcess" + $"{IdAssistant}" + ".cs";
            // Create a file to write to.
            using (StreamWriter sw = File.CreateText(path))
            {
                sw.WriteLine($@"using Microsoft.Playwright;
using System;
using System.Threading.Tasks;
class AssistantProcess{IdAssistant}" + @"
{
public  async Task Play()
{
using var playwright = await Playwright.CreateAsync();
await using var browser = await playwright.Webkit.LaunchAsync(new BrowserTypeLaunchOptions
{
    Headless = true,
    SlowMo = 2000
});
var context = await browser.NewContextAsync();

// Open new page
var page = await context.NewPageAsync(); ");

                foreach (AssistantProcedure Procedure in AssistantProcedures)
                {
                    switch (Procedure.ProcedureName)
                    {
                        case "Pesquisar no google":
                            sw.WriteLine(@"await page.GotoAsync(" + '"' + "https://www.google.com/?gws_rd=ssl%22" + '"' + ");");
                            sw.WriteLine($@"await page.FillAsync(" + '"' + "input[title = " + "'" + "Pesquisar" + "'" + "]" + '"' + "," + '"' + $"{Procedure.ProcedureValue}" + '"' + ");");
                            sw.WriteLine($@"await page.PressAsync(" + '"' + "input[title = " + "'" + "Pesquisar" + "'" + "]" + '"' + "," + '"' + "Enter" + '"' + ");");
                            //sw.WriteLine($@"await page.PressAsync('input[title = 'Pesquisar']', 'Enter');");
                            break;

                        case "Ir para a url":
                            sw.WriteLine(@"await page.GotoAsync(" + '"' + $"{Procedure.ProcedureValue}" + '"' + ");");
                            break;

                        case "Clicar no primeiro link":
                            sw.WriteLine(@"await page.ClickAsync" + '"' + "h3.LC20lb.MBeuO.DKV0Md" + '"' + ");");
                            break;

                        case "Clicar na aba imagens":
                            sw.WriteLine(@"await page.Locator(" + '"' + "#hdtb-msb >> text=Imagens" + '"' + ").ClickAsync();");
                            break;

                        case "Clicar na primeira imagem":
                            sw.WriteLine(@" await page.ClickAsync(" + '"' + "img.rg_i.Q4LuWd" + '"' + ");");
                            break;

                        case "Clicar na aba noticias":
                            sw.WriteLine(@"await page.Locator(" + '"' + "#hdtb-msb >> text=Notícias" + '"' + ").ClickAsync();");
                            break;

                        case "Clicar na primeira noticia":
                            sw.WriteLine(@"await page.ClickAsync(" + '"' + "div.mCBkyc.y355M.JQe2Ld.nDgy9d" + '"' + ");");
                            break;

                        case "Entrar na primeira noticia":
                            sw.WriteLine(@"var waitForMessageTask = page.WaitForConsoleMessageAsync();");
                            sw.WriteLine(@" await page.EvaluateAsync(" + '"' + "console.log(document.URL);" + '"' + ");");
                            sw.WriteLine(@"var message = await waitForMessageTask;
Console.WriteLine(message.Text);");
                            break;

                        default:
                            break;
                    }
                }
                sw.WriteLine(@"await page.ScreenshotAsync(new PageScreenshotOptions { Path =" + '"' + "./StaticFiles/Images/Assistant" + IdAssistant + ".png" + '"' + " });}}");
                
            }
            string pathRun = $"./Controllers/Assistant{IdAssistant}Controller.cs";
            // Create a file to write to.
            using (StreamWriter sw2 = File.CreateText(pathRun))
            {
                sw2.WriteLine(@"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Repositories;
using _2RPNET_API.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;
using System.Diagnostics;
namespace _2RPNET_API.Controllers
{
    [Route(" + '"' + "api/[controller]" + '"' + @$")]
    [ApiController]
    public class Assistant{IdAssistant}Controller : ControllerBase" +
    @"{
        private IAssistantRepository _AssistantRepository { get; set; }

        public Assistant" + $"{IdAssistant}" + @"Controller(IAssistantRepository Assistant)
        {
            _AssistantRepository = Assistant;
        }
/// <summary>
/// Method responsible for create a Run process
/// </summary>
[HttpPost(" + '"' + "Post/{email}/{corpo}" + '"' + @")]
public IActionResult NewRun(string email, string corpo)
{
    try
    {"
        + $"AssistantProcess{IdAssistant} _program = new AssistantProcess{IdAssistant}();" + @"
        _program.Play();
        _AssistantRepository.EnviaEmail(" + IdAssistant + @", email, corpo);
        return StatusCode(201);
    }
    catch (Exception ex)
    {
        return BadRequest(ex);
    }
}
    }
}");
            }
            //Process.Start("./run.bat");
            return $"C:\\Users\\44037739828.INFOSCS\\Desktop\\Bots-4RPA\\StaticFiles\\Images\\Assistant{IdAssistant}.png";
        }

        public List<AssistantProcedure> ReadAll()
        {
            return ctx.AssistantProcedures.ToList();
        }

        public List<AssistantProcedure> SearchByAssistant(int IdAssistant)
        {
            List<AssistantProcedure> listProcedures = ctx.AssistantProcedures.Where(c => c.IdAssistant == IdAssistant).ToList();
            return listProcedures.OrderBy(o => o.ProcedurePriority).ToList();
        }

        public AssistantProcedure SearchByID(int IdAssistantProcedure)
        {
            return ctx.AssistantProcedures.FirstOrDefault(c => c.IdAprocedure == IdAssistantProcedure);
        }

        public void Update(int IdAssistantProcedure, AssistantProcedure NewProcess)
        {
            AssistantProcedure SearchAssistant = SearchByID(IdAssistantProcedure);

            if (NewProcess.ProcedureName != null && NewProcess.ProcedureDescription != null)
            {
                SearchAssistant.ProcedurePriority = NewProcess.ProcedurePriority;
                SearchAssistant.ProcedureName = NewProcess.ProcedureName;
                SearchAssistant.ProcedureDescription = NewProcess.ProcedureDescription;
                SearchAssistant.IdAssistant = NewProcess.IdAssistant;
            }

            ctx.AssistantProcedures.Update(SearchAssistant);

            ctx.SaveChanges();
        }


    }
}
