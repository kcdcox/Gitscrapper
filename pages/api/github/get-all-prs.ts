import {
  gitAuthenticationProcess,
  openHeadedBrowser,
  // getAllPRDetails,
  getAllPRLinks,
  getAllPRsURL,
} from "./utilities/get-all-prs-utils";

const handler = async (req: any, res: any) => {
  let { state = "closed", author = "kcdcox", assigned = false } = req.query;
  const url = await getAllPRsURL(state, assigned, author);
  const [page, browser] = await openHeadedBrowser(url); // gets headless browser
  await gitAuthenticationProcess(page); // gets user authenticated
  const allPRLinks = await getAllPRLinks(page, state, assigned, author);
  // const allPRDetails = await getAllPRDetails(page, allPRLinks);
  console.log("DATAAAA");
  console.log(allPRLinks);
  await browser.close(); // Closes headedless browser

  if (req.method === "POST") {
    const data = req.body;

    res.status(201).json({ message: "Success!", allPRLinks });
  }
};

export default handler;
