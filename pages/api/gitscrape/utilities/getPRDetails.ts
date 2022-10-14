import moment from "moment";
import _ from "lodash";
import { getLoadingBar, returnConsoleSection } from "utilities/styling";
import { getISODate } from "utilities/date";
import { getPRListURL } from "./urls";

export const getPRListLinks = async (
  page: any,
  open: string,
  assigned: string,
  author: string,
  merged: string
) => {
  const relation = assigned === "true" ? "ASSIGNED" : "AUTHORED";
  console.log(`🔵 RETRIEVEING ${author.toUpperCase()}'S ${relation} PR LINKS`);
  let originalLinks = await scrapePRPageLinks(page, open, assigned, author);
  // Get Assigned/Created/Both PRs
  if (assigned === "both") {
    console.log(`🔵 RETRIEVEING ${author.toUpperCase()}'S ASSIGNED PR LINKS`);
    const assignedLinks = await scrapePRPageLinks(page, open, "true", author);
    originalLinks = _.uniqWith(
      [...originalLinks, ...assignedLinks],
      (a: any, b: any) => a.link === b.link
    );
  }
  // Filter Merged/Closed PRs
  if (merged !== "both") {
    console.log(`🟣 Removing potential duplicates.`);
    originalLinks = originalLinks.filter((link: any) => {
      return link.merged?.includes(merged === "true" ? "Merged" : "Closed");
    });
  }
  console.log(`🟣 Sorting links by date.\n`);
  originalLinks.sort((a: any, b: any) =>
    moment(getISODate(a.date)).isBefore(getISODate(b.date)) ? 1 : -1
  );
  return originalLinks;
};

const scrapePRPageLinks = async (
  page: any,
  open: string,
  assigned: string,
  author: string
) => {
  let hasMorePages = true;
  let PRLinks = [];
  let pageNum = 1;
  let url = await getPRListURL(true, open, assigned, author, pageNum);
  while (hasMorePages) {
    try {
      console.log(`🟠 Going to page ${pageNum}: ${url}`);
      await page.goto(url, {
        networkIdleTimeout: 1000,
        waitUntil: "networkidle2",
        timeout: 10000,
      });
      // hasMorePages = false;
      await page.waitForSelector("div.Box-row--drag-hide", { timeout: 7000 });
      url = await getPRListURL(true, open, assigned, author, ++pageNum);
      try {
        PRLinks.push(
          ...(await page.$$eval("div.Box-row", (table: any) =>
            table.map((row: any) => {
              const link = row.querySelector("a.Link--primary")?.href;
              const name = row.querySelector("a.Link--primary")?.innerText;
              const cmnts = row.querySelector("a.Link--muted span.text-bold");
              const merged = row.querySelector("span.tooltipped-e");
              const date = row
                .querySelector("relative-time")
                ?.getAttribute("datetime");
              const title = `=HYPERLINK(""${link}"";""${name}"")`;
              return {
                link,
                name,
                title,
                date,
                comments: cmnts?.innerText,
                repo: row.querySelector("a.Link--muted")?.innerText,
                merged: merged?.getAttribute("aria-label") ?? "Closed",
              };
            })
          ))
        );
      } catch (e) {
        console.log("🔴 An error occured while scraping PR data: " + e);
      }
    } catch (err) {
      console.log("🟡 Found final page——no more PRs.");
      hasMorePages = false;
    }
  }
  return PRLinks;
};

export const getAllPRDetails = async (
  page: any,
  prLinks: any,
  author: string
) => {
  let allPRDetails: any = [];
  if (Array.isArray(prLinks) && prLinks.length) {
    console.log(
      `🔵 SCRAPING ${prLinks.length} OF ${author.toUpperCase()}'S PRs`
    );
    for (let i = 0; i < prLinks.length; i++) {
      const prDetails = { ...prLinks[i] };
      if (prLinks[i].link) {
        try {
          await page.goto(prLinks[i].link, {
            networkIdleTimeout: 1000,
            waitUntil: "networkidle2",
            timeout: 10000,
          });
          prDetails.linesAdded = await page.evaluate(
            'document.querySelector("span.color-fg-success")?.innerText'
          );
          prDetails.linesRemoved = await page.evaluate(
            'document.querySelector("span.color-fg-danger")?.innerText'
          );
          process.stdout.write(getLoadingBar(prLinks.length, i));
          allPRDetails.push(prDetails);
        } catch (err) {
          console.log("🔴 An error occured while fetching PR details:" + err);
        }
      }
    }
  }
  console.log("\n");
  return allPRDetails;
};

export const filterDuplicates = async (allPRs: any) => {
  return _.uniqWith(allPRs, (a: any, b: any) => a.link === b.link);
};

const scrapeReviewPageLinks = async (
  page: any,
  open: string,
  assigned: string,
  author: string
) => {
  let hasMorePages = true;
  let PRLinks = [];
  let pageNum = 1;
  let url = await getReviewListURL(open, assigned, author, pageNum);
  while (hasMorePages) {
    try {
      console.log(`🟠 Going to page ${pageNum}: ${url}`);
      await page.goto(url, {
        networkIdleTimeout: 1000,
        waitUntil: "networkidle2",
        timeout: 10000,
      });
      // hasMorePages = false;
      await page.waitForSelector("div.Box-row--drag-hide", { timeout: 7000 });
      url = await getReviewListURL(open, assigned, author, ++pageNum);
      try {
        PRLinks.push(
          ...(await page.$$eval("div.Box-row", (table: any) =>
            table.map((row: any) => {
              const link = row.querySelector("a.Link--primary")?.href;
              const name = row.querySelector("a.Link--primary")?.innerText;
              const cmnts = row.querySelector("a.Link--muted span.text-bold");
              const merged = row.querySelector("span.tooltipped-e");
              const date = row
                .querySelector("relative-time")
                ?.getAttribute("datetime");
              const title = `=HYPERLINK(""${link}"";""${name}"")`;
              return {
                link,
                name,
                title,
                date,
                comments: cmnts?.innerText,
                repo: row.querySelector("a.Link--muted")?.innerText,
                merged: merged?.getAttribute("aria-label") ?? "Closed",
              };
            })
          ))
        );
      } catch (e) {
        console.log("🔴 An error occured while scraping PR data: " + e);
      }
    } catch (err) {
      console.log("🟡 Found final page——no more PRs.");
      hasMorePages = false;
    }
  }
  return PRLinks;
};
