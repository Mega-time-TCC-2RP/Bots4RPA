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
            Headless = true,
            SlowMo = 1000
        });
        var context = await browser.NewContextAsync();

        // Open new page
        var page = await context.NewPageAsync();

        // Go to https://www.google.com/?gws_rd=ssl
        await page.GotoAsync("https://www.google.com/?gws_rd=ssl");

        await page.FillAsync("input[title='Pesquisar']", "valor dolar");
        
        // Hit Enter
        await page.PressAsync("input[title='Pesquisar']", "Enter");

        await page.ScreenshotAsync(new PageScreenshotOptions { Path = "screenshot.png" });
        

    }
}