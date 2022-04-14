const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    viewport: {
      width: 1980,
      height: 1080
    }
  });

  // Open new page
  const page = await context.newPage();

  // Go to https://www.google.com/?gws_rd=ssl
  await page.goto('https://www.google.com/?gws_rd=ssl');

  // Go to https://www.google.com/search?q=javascript&oq=javascript&aqs=chrome..69i57.2119j0j4&sourceid=chrome&ie=UTF-8
  await page.goto('https://www.google.com/search?q=javascript&oq=javascript&aqs=chrome..69i57.2119j0j4&sourceid=chrome&ie=UTF-8');

  // Click div[role="main"] >> text=JavaScript - MDN Web Docs - Mozilla
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript' }*/),
    page.locator('div[role="main"] >> text=JavaScript - MDN Web Docs - Mozilla').click()
  ]);

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();