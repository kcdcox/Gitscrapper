import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const DEVELOPMENT = true;

const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";

export const delay = (time: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

export const openHeadedBrowser = async (url: string) => {
  const headedBrowserOptions = {
    headless: false,
    devtools: true,
    args: [`--window-size=${2620},${2000}`, "--use-gl=egl", "--shm-size=1gb"],
  };
  // puppeteer.use(StealthPlugin());
  const authBrowser = await puppeteer.launch(headedBrowserOptions);
  const authPage = await authBrowser.newPage();
  await authPage.setViewport({ width: 3066, height: 10968 });
  await authPage.setUserAgent(userAgent);
  await authPage.goto(url, { waitUntil: "load", timeout: 0 });
  return [authPage, authBrowser];
};

export const gitAuthProcess = async (page: any) => {
  if (DEVELOPMENT) {
    await myGithubAuthenticationProcess(page);
  } else {
    await page.waitForSelector("div.table-list-header-toggle", { timeout: 0 });
    await Promise.all([page.waitForNavigation(), await page.click("p.note a")]);
    await page.waitForSelector("div.okta-sign-in-header", { timeout: 0 });
    await page.waitForSelector("input[name='identifier']", { timeout: 0 });
    await page.waitForSelector("div.table-list-header-toggle", { timeout: 0 });
  }
};

const myGithubAuthenticationProcess = async (page: any) => {
  await page.waitForSelector("input#login_field", { timeout: 0 });
  await page.focus("input#login_field");
  await page.keyboard.type(process.env.MY_PERSONAL_EMAIL);
  await page.focus("input[name=password]");
  await page.keyboard.type(process.env.MY_GITHUB_PASSWORD);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);
  await page.click('button[data-action="click:webauthn-get#prompt"]');
  await page.waitForSelector("div.table-list-header-toggle", { timeout: 0 });
  await Promise.all([page.waitForNavigation(), await page.click("p.note a")]);
  await page.waitForSelector("div.org-sso-panel", { timeout: 0 });
  await page.waitForSelector("button[type='submit']", { timeout: 0 });
  await page.click("button[type='submit']");
  await page.waitForSelector("div.okta-sign-in-header", { timeout: 0 });
  await page.waitForSelector("input[name='identifier']", { timeout: 0 });
  await page.waitForTimeout(1000);
  await page.focus("input[name='identifier']");
  await page.keyboard.type(process.env.MY_SHOPIFY_EMAIL);
  await page.focus("input[type='password']");
  await page.keyboard.type(process.env.MY_GITHUB_PASSWORD);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"]'),
  ]);
  await page.waitForSelector("div.table-list-header-toggle", { timeout: 0 });
};

export const switchToHeadlessBrowsing = async (authPage: any) => {
  const headlessBrowserOptions = {
    headless: true,
    defaultViewport: null,
  };
  puppeteer.use(StealthPlugin());
  // Save current cookies
  const client = await authPage.target().createCDPSession();
  const cookies = (await client.send("Network.getAllCookies"))["cookies"];
  console.log("Saving", cookies.length, "cookies");
  // Open new headless browser session
  const browser = await puppeteer.launch(headlessBrowserOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: 3066, height: 10968 });
  await page.setUserAgent(userAgent);
  // Restore cookies in headless browser session
  try {
    console.log("Restoring", cookies.length, "cookies into browser");
    await page.setCookie(...cookies);
  } catch (err) {
    console.log("An error occurred while restoring cookies", err);
  }
  return [page, browser]; // return headless browser page to crawl
};
