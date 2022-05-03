using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class Program
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            Headless = false,
            SlowMo = 3000
        });
        var context = await browser.NewContextAsync();

        // Open new page
        var page = await context.NewPageAsync();

        // Go to https://www.google.com/?gws_rd=ssl
        await page.GotoAsync("https://www.google.com/?gws_rd=ssl");

        await page.FillAsync("input[title='Pesquisar']", "dilica da nona");
        
        // Hit Enter
        await page.PressAsync("input[title='Pesquisar']", "Enter");

        //entra no link que aparece quando pesquisa
        // await page.ClickAsync("h3.LC20lb.MBeuO.DKV0Md");

        //entra na parte de imagens do google e pega primeira imagem
        await page.Locator("#hdtb-msb >> text=Imagens").ClickAsync();

        await page.ClickAsync("img.rg_i.Q4LuWd");

        //clica na primeira imagem e vai pro link dela
        await page.ClickAsync("img.n3VNCb");

        await page.ScreenshotAsync(new PageScreenshotOptions { Path = "screenshot.png" });

    }
}