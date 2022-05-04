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
            SlowMo = 4000
        });
        var context = await browser.NewContextAsync();

        // Open new page
        var page = await context.NewPageAsync();

        // Go to https://www.google.com/?gws_rd=ssl
        await page.GotoAsync("https://www.google.com/?gws_rd=ssl");

        await page.FillAsync("input[title='Pesquisar']", "chocolaate");
        
        // Hit Enter
        await page.PressAsync("input[title='Pesquisar']", "Enter");

        //entra no 1° link que aparece quando pesquisa
        // await page.ClickAsync("h3.LC20lb.MBeuO.DKV0Md");
        // await page.ClickAsync("h3.mCBkyc.y355M.JQe2Ld.nDgy9d");

        ////////////////////////////////////////////////////////

        //entra na parte de imagens do google e pega primeira imagem
        // await page.Locator("#hdtb-msb >> text=Imagens").ClickAsync();

        // await page.ClickAsync("img.rg_i.Q4LuWd");

        //clica na primeira imagem e vai pro link dela
        // await page.ClickAsync("span.KSvtLc");
        // await page.ClickAsync("img.n3VNCb");

        //////////////////////////////////////////////////////

        await page.Locator("#hdtb-msb >> text=Notícias").ClickAsync();

        await page.ClickAsync("div.mCBkyc.y355M.JQe2Ld.nDgy9d");


        const {browser}=this.helpers.Playwright;
        await browser.pages(); //list pages in the browser

        //get current page
        const {page}=this.helpers.Playwright;
        const url=await page.url();//get the url of the current page
        Console.WriteLine(url);


        await page.ScreenshotAsync(new PageScreenshotOptions { Path =  "screenshot.png"});

    }
}