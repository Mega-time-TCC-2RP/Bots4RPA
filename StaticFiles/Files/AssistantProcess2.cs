using Microsoft.Playwright;
using System;
using System.Threading.Tasks;
class AssistantProcess2
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
var page = await context.NewPageAsync(); 
await page.GotoAsync("https://github.com/Mega-time-TCC-2RP/Bots-4RPA");
await page.ScreenshotAsync(new PageScreenshotOptions { Path ="./StaticFiles/Images/Assistant2.png" });}}
