using _2RPNET_API.Context;
using _2RPNET_API.Domains;
using _2RPNET_API.Interfaces;
using _2RPNET_API.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.IO;

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

        public void Delete(int IdAssistant)
        {
            List<AssistantProcedure> assistantProcedures = SearchByAssistant(IdAssistant);

            ctx.AssistantProcedures.RemoveRange(assistantProcedures);

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
await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
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
                            sw.WriteLine(@"await page.ClickAsync(" + '"' + "h3.LC20lb.MBeuO.DKV0Md" + '"' + ");");
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
                        case "Enviar email":
                            //AssistantRepository assistantRepository = new AssistantRepository();
                            //assistantRepository.EnviaEmail((int idAssistant, SendEmailViewModel emailConfig);
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
using _2RPNET_API.ViewModels;
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
[HttpPost(" + '"' + "Post/" + '"' + @")]
public IActionResult NewRun(SendEmailViewlModel assistant)
{
    try
    {
"
        + $"AssistantProcess{IdAssistant} _program = new AssistantProcess{IdAssistant}();" + @"
        _program.Play();
        _AssistantRepository.EnviaEmail(" + $"{IdAssistant}," + @"assistant);
        return StatusCode(204);
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

            if (NewProcess.IdAssistant > 0 && NewProcess.ProcedurePriority > 0 && NewProcess.ProcedureName != null && NewProcess.ProcedureDescription != null && NewProcess.ProcedureValue != null)
            {
                SearchAssistant.IdAssistant = NewProcess.IdAssistant;
                SearchAssistant.ProcedurePriority = NewProcess.ProcedurePriority;
                SearchAssistant.ProcedureName = NewProcess.ProcedureName;
                SearchAssistant.ProcedureDescription = NewProcess.ProcedureDescription;
                SearchAssistant.ProcedureValue = NewProcess.ProcedureValue;
            }

            ctx.AssistantProcedures.Update(SearchAssistant);
            ctx.SaveChanges();
        }

        public AssistantProcedure SearchByName(string ProcedureName)
        {
            return ctx.AssistantProcedures.FirstOrDefault(a => a.ProcedureName == ProcedureName);
        }

        public void ChangeVerification(int IdAssistant, ArrayViewModel ArrayViewModel)
        {
            // AssistantProcedure UpdateProcess
            //string ProcedureName = ArrayViewModel.ProcedureName;
            //AssistantRepository Assistant = SearchByID(IdAssistant);

            //List<AssistantProcedure> AssistantSoughtList = SearchByAssistant(IdAssistant);
            // fazer verficação
            //List<AssistantProcedure> ProceduresList = ctx.AssistantProcedures.ToList();

            List<AssistantProcedure> ProceduresList = SearchByAssistant(IdAssistant);
            bool UpdatedVerification = true;

            if (ProceduresList.Count() > 0)
            {
                foreach (var item in ProceduresList)
                {
                    if (item.ProcedurePriority == ArrayViewModel.ProcedurePriority || item.ProcedureName == ArrayViewModel.ProcedureName || item.ProcedureDescription == ArrayViewModel.ProcedureDescription || item.ProcedureValue == ArrayViewModel.ProcedureValue)
                    {
                        if (item.IdAssistant != IdAssistant)
                        {
                            item.IdAssistant = IdAssistant;
                        }

                        if (item.ProcedurePriority != ArrayViewModel.ProcedurePriority)
                        {
                            item.ProcedurePriority = ArrayViewModel.ProcedurePriority;
                        }

                        if (item.ProcedureName != ArrayViewModel.ProcedureName)
                        {
                            item.ProcedureName = ArrayViewModel.ProcedureName;
                        }

                        if (item.ProcedureDescription != ArrayViewModel.ProcedureDescription)
                        {
                            item.ProcedureDescription = ArrayViewModel.ProcedureDescription;
                        }

                        if (item.ProcedureValue != ArrayViewModel.ProcedureValue)
                        {
                            item.ProcedureValue = ArrayViewModel.ProcedureValue;
                        }

                        ctx.AssistantProcedures.Update(item);
                        ctx.SaveChanges();
                        UpdatedVerification = true;
                    }
                    else
                    {
                        UpdatedVerification = false;
                    }

                }
                if (UpdatedVerification == false)
                {
                    AssistantProcedure _repository = new AssistantProcedure();
                    _repository.IdAssistant = IdAssistant;
                    _repository.ProcedurePriority = ArrayViewModel.ProcedurePriority;
                    _repository.ProcedureName = ArrayViewModel.ProcedureName;
                    _repository.ProcedureDescription = ArrayViewModel.ProcedureDescription;
                    _repository.ProcedureValue = ArrayViewModel.ProcedureValue;

                    ctx.AssistantProcedures.Add(_repository);
                    ctx.SaveChanges();
                }
            }
            else
            {
                AssistantProcedure _repository = new AssistantProcedure();
                _repository.IdAssistant = IdAssistant;
                _repository.ProcedurePriority = ArrayViewModel.ProcedurePriority;
                _repository.ProcedureName = ArrayViewModel.ProcedureName;
                _repository.ProcedureDescription = ArrayViewModel.ProcedureDescription;
                _repository.ProcedureValue = ArrayViewModel.ProcedureValue;

                ctx.AssistantProcedures.Add(_repository);
                ctx.SaveChanges();
            }
        }

    }
}
