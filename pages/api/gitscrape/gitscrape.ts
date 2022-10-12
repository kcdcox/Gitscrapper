import { getPRListURL } from "./utilities/urls";
import { returnConsoleSection } from "utilities/styling";
import { getAllPRDetails, getPRListLinks } from "./utilities/getPRDetails";
import { getLinesChangedGraphData } from "./utilities/getLinesChangedGraphData";

import {
  gitAuthProcess,
  openHeadedBrowser,
  switchToHeadlessBrowsing,
} from "./utilities/launching";
import _ from "lodash";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    returnConsoleSection("GITSCRAPE HAS STARTED");
    console.log("🟣 Opening puppeteer browser for GitHub authentication...");
    let { open, merged, author, assigned } = req.body.filters;
    const url = await getPRListURL(open, assigned, author, merged);
    const [page, browser] = await openHeadedBrowser(url); // gets headless browser
    await gitAuthProcess(page); // gets user authenticated
    const [newPage, newBrowser] = await switchToHeadlessBrowsing(page);
    console.log("🟣 Closing auth browser, and switching to headless browsing.");
    await browser.close(); // Closes headedless browser
    const PRLinks = await getPRListLinks(
      newPage,
      open,
      assigned,
      author,
      merged
    );
    const PRDetails = await getAllPRDetails(newPage, PRLinks, author);
    await newBrowser.close(); // Closes headedless browser
    console.log("🟣 Computing graph data.");
    const linesChangedGraphData = getLinesChangedGraphData(PRDetails);
    res.status(201).json({
      message: "Success!",
      data: {
        PRDetails,
        linesChangedGraphData,
      },
    });
    returnConsoleSection("GITSCRAPE HAS ENDED");
  }
};

export default handler;
