using Microsoft.Playwright;
using System;
using System.Threading.Tasks;
class AssistantProcess8
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
var page = await context.NewPageAsync(); 
await page.GotoAsync("https://www.google.com/?gws_rd=ssl%22");
await page.FillAsync("input[title = 'Pesquisar']","Bitcoin");
await page.PressAsync("input[title = 'Pesquisar']","Enter");
//await page.ClickAsync("div.mCBkyc.y355M.JQe2Ld.nDgy9d");
await page.ScreenshotAsync(new PageScreenshotOptions { Path ="./StaticFiles/Images/Assistant8.png" });}}
