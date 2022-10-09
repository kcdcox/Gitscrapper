import { getPRListURL } from "./utilities/urls";
import { getAllPRDetails, getPRListLinks } from "./utilities/getPRDetails";
import { gitAuthProcess, openHeadedBrowser } from "./utilities/launching";
import _ from "lodash";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    console.log(req.body);
    let {
      open = "closed",
      merged = "true",
      author,
      assigned = "false",
    } = req.query;
    author = "kcdcox";
    const url = await getPRListURL(open, assigned, author, merged);
    const [page, browser] = await openHeadedBrowser(url); // gets headless browser
    await gitAuthProcess(page); // gets user authenticated
    const PRLinks = await getPRListLinks(page, open, assigned, author, merged);
    const PRDetails = await getAllPRDetails(page, PRLinks);
    await browser.close(); // Closes headedless browser
    res.status(201).json({ message: "Success!", PRDetails });
  }
};

export default handler;
