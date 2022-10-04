import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const DEVELOPMENT = false;

const query = "%3A";

const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";

const prURLPrefix = (pageNum: number) =>
  `https://github.com/pulls?page=${pageNum}&q=is${query}pr`;

const createdOrAssigned = (assigned: string, author: string) =>
  assigned ? `+assignee${query}${author}` : `+author${query}${author}`;

export const getAllPRsURL = async (
  state: string,
  assigned: string,
  author: string,
  pageNum?: number
) => {
  return `${prURLPrefix(pageNum ?? 1)}+is${query}${state}${createdOrAssigned(
    assigned,
    author
  )}`;
};

export const gitAuthenticationProcess = async (page: any) => {
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

export const openHeadedBrowser = async (url: string) => {
  const headedBrowserOptions = {
    headless: false,
    devtools: true,
    slowMo: 100,
    ignoreHTTPSErrors: true,
    args: [`--window-size=${2620},${2000}`, "--use-gl=egl"],
  };
  const authBrowser = await puppeteer.launch(headedBrowserOptions);
  const authPage = await authBrowser.newPage();
  await authPage.setViewport({ width: 3066, height: 10968 });
  await authPage.setUserAgent(userAgent);
  await authPage.goto(url);
  return [authPage, authBrowser];
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

export const getAllPRLinks = async (
  page: any,
  state: string,
  assigned: string,
  author: string
) => {
  let hasMorePages = true;
  let allPRLinks = [];
  let pageNum = 1;
  let url = await getAllPRsURL(state, assigned, author, pageNum);
  puppeteer.use(StealthPlugin());
  console.log(url);
  while (hasMorePages) {
    await page.goto(url, {
      networkIdleTimeout: 1000,
      waitUntil: "networkidle2",
      timeout: 10000,
    });
    try {
      await page.waitForSelector("div.Box-row--drag-hide", { timeout: 6000 });
      url = await getAllPRsURL(state, assigned, author, ++pageNum);
      console.log(url);
      allPRLinks.push(
        ...(await page.$$eval("div.Box-row", (table: any) =>
          table.map((row: any) => {
            return {
              link: row.querySelector("a.Link--primary")?.href,
              repo: row.querySelector("a.Link--muted")?.innerText,
              prTitlerow: row.querySelector("a.Link--primary")?.innerText,
            };
          })
        ))
      );
    } catch (err) {
      console.log("Has no more pages");
      hasMorePages = false;
    }
  }
  return allPRLinks;
};

const myGithubAuthenticationProcess = async (page: any) => {
  console.log(process.env.MY_PERSONAL_EMAIL);
  await page.waitForSelector("input#login_field", { timeout: 0 });
  await page.$eval("input#login_field", (el: any) => {
    console.log(el.value);
    console.log(el);
    el.value = process.env.MY_PERSONAL_EMAIL;
  });
  await page.$eval(
    "input[name=password]",
    (el: any) => (el.value = process.env.MY_GITHUB_PASSWORD)
  );
  await Promise.all([
    page.waitForNavigation(),
    await page.click('input[type="submit"]'),
  ]);

  await page.click('button[data-action="click:webauthn-get#prompt"]');

  await page.waitForSelector("div.table-list-header-toggle", { timeout: 0 });
  await Promise.all([page.waitForNavigation(), await page.click("p.note a")]);

  await page.waitForSelector("div.org-sso-panel", { timeout: 0 });
  await page.waitForSelector("button[type='submit']", { timeout: 0 });
  await page.click("button[type='submit']");

  await page.waitForSelector("div.okta-sign-in-header", { timeout: 0 });
  await page.waitForSelector("input[name='identifier']", { timeout: 0 });

  await page.focus("input[name='identifier']");
  await page.keyboard.type(process.env.MY_SHOPIFY_EMAIL);
  await page.focus("input[type='password']");
  await page.keyboard.type(process.env.MY_GITHUB_PASSWORD);
  await Promise.all([
    page.waitForNavigation(),
    await page.click('input[type="submit"]'),
  ]);
};

// export const getAllPRDetails = async (page, link) => {
//   let allPRDetails = [];
//   if (Array.isArray(allPRs)) {
//     allPRLinks.forEach(async (pr, index) => {
//       console.log("pr: ", index, pr);
//       if (pr.link) {
//         await page.waitForSelector("a.participant-avatar", { timeout: 0 });

//         // const prData = await page.$$eval("a.participant-avatar", (table) =>
//         //   table.map((row) => row.querySelector("a.Link--primary")?.href)
//         // );
//         pr.linesAdded = prDetails.linesAdded;
//       }
//     });
//   }
//   return allPRDetails;
// };
