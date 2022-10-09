import moment from "moment";
import _ from "lodash";

import { getPRListURL } from "./urls";

export const getPRListLinks = async (
  page: any,
  open: string,
  assigned: string,
  author: string,
  merged: string
) => {
  let originalLinks = await scrapePRPageLinks(page, open, assigned, author);
  // Get Assigned/Created/Both PRs
  if (assigned === "both") {
    const assignedLinks = await scrapePRPageLinks(page, open, "true", author);
    originalLinks = _.uniqWith(
      [...originalLinks, ...assignedLinks],
      (a: any, b: any) => a.link === b.link
    );
  }
  // Filter Merged/Closed PRs
  if (merged !== "both") {
    originalLinks = originalLinks.filter((link: any) => {
      return link.merged?.includes(merged === "true" ? "Merged" : "Closed");
    });
  }
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
  let url = await getPRListURL(open, assigned, author, pageNum);
  while (hasMorePages) {
    try {
      console.log("Going to: " + url);
      await page.goto(url, {
        networkIdleTimeout: 1000,
        waitUntil: "networkidle2",
        timeout: 10000,
      });
      hasMorePages = false;
      await page.waitForSelector("div.Box-row--drag-hide", { timeout: 6000 });
      url = await getPRListURL(open, assigned, author, ++pageNum);
      PRLinks.push(
        ...(await page.$$eval("div.Box-row", (table: any) =>
          table.map((row: any) => {
            const link = row.querySelector("a.Link--primary")?.href;
            const name = row.querySelector("a.Link--primary")?.innerText;
            const comments = row.querySelector("a.Link--muted span.text-bold");
            const merged = row.querySelector("span.tooltipped-e");
            const title = `=HYPERLINK(""${link}"";""${name}"")`;
            return {
              link,
              title,
              comments: comments?.innerText,
              repo: row.querySelector("a.Link--muted")?.innerText,
              merged: merged?.getAttribute("aria-label") ?? "Closed",
            };
          })
        ))
      );
    } catch (err) {
      console.log("On last page——no more PRs");
      hasMorePages = false;
    }
  }
  return PRLinks;
};

export const getAllPRDetails = async (page: any, prLinks: any) => {
  let allPRDetails: any = [];
  if (Array.isArray(prLinks) && prLinks.length) {
    for (let i = 0; i < prLinks.length; i++) {
      const prDetails = { ...prLinks[i] };
      if (prLinks[i].link) {
        try {
          console.log("Going to Link: " + prLinks[i].link);
          await page.goto(prLinks[i].link, {
            networkIdleTimeout: 1000,
            waitUntil: "networkidle2",
            timeout: 7000,
          });
          console.log("Grabbing PR details...");
          const date = await page.evaluate(
            'document.querySelector("relative-time").getAttribute("datetime")'
          );
          prDetails.date = moment(prDetails.date).format("MMM/DD/YYYY");
          prDetails.linesAdded = await page.evaluate(
            'document.querySelector("span.color-fg-success").innerText'
          );
          prDetails.linesRemoved = await page.evaluate(
            'document.querySelector("span.color-fg-danger").innerText'
          );
          allPRDetails.push(prDetails);
        } catch (err) {
          console.log("An error occured while fetching PR details");
          console.log(err);
        }
      }
    }
  }
  return allPRDetails;
};

export const filterDuplicates = async (allPRs: any) => {
  return _.uniqWith(allPRs, (a: any, b: any) => a.link === b.link);
};
