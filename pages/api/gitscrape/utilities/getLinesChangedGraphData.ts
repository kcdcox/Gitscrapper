import moment from "moment";
import { getISODate } from "utilities/date";

export const getLinesChangedGraphData = (PRs: any) => {
  const isArray = Array.isArray(PRs) && PRs.length > 1;
  const isNotSorted = moment(PRs[0].date).isAfter(PRs[1].date);

  let biMonthlyData: any = [];
  const monthlyData: any = [];
  let sortedPRs = PRs;
  let index = 0;

  if (isArray && isNotSorted) sortedPRs = PRs.reverse();
  let endDate: any = getISODate(sortedPRs[sortedPRs.length - 1]?.date);
  let currDate: any = getISODate(sortedPRs[0]?.date);

  const getRangeData = (start: any, end: any) => {
    const format = "MMM 'YY";
    let linesRemoved = 0;
    let linesAdded = 0;

    for (index; index < sortedPRs.length; index++) {
      const date = getISODate(sortedPRs[index].date);
      if (moment(date).isAfter(start) && moment(date).isBefore(end)) {
        linesAdded += parseInt(sortedPRs[index].linesAdded.slice(1).trim());
        linesRemoved += parseInt(sortedPRs[index].linesRemoved.slice(1).trim());
      } else {
        break;
      }
    }

    biMonthlyData.push({
      name: `${moment(start).format(format)}`,
      linesAdded: linesAdded,
      linesRemoved: linesRemoved,
      totalLines: linesAdded + linesRemoved,
    });
  };

  const getBiMonthlyData = (date: any) => {
    const start = moment(date).startOf("month");
    const middle = moment(start).add(15, "days");
    const end = moment(date).endOf("month");
    getRangeData(start, middle);
    getRangeData(middle, end);
  };

  while (index < sortedPRs.length && moment(currDate).isBefore(endDate)) {
    getBiMonthlyData(currDate);
    currDate = moment(currDate).add(1, "month");
  }

  for (let i = 0; i < biMonthlyData.length; i = i + 2) {
    monthlyData.push({
      name: biMonthlyData[i].name,
      linesAdded: biMonthlyData[i].linesAdded + biMonthlyData[i + 1].linesAdded,
      linesRemoved:
        biMonthlyData[i].linesRemoved + biMonthlyData[i + 1].linesRemoved,
      totalLines: biMonthlyData[i].totalLines + biMonthlyData[i + 1].totalLines,
    });
  }

  return {
    biMonthlyData,
    monthlyData,
  };
};

const PRs = [
  {
    link: "https://github.com/Shopify/fbs/pull/53281",
    name: "Merchant App | Adding Unsigned Terms of Service Returns View",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/53281"";""Merchant App | Adding Unsigned Terms of Service Returns View"")',
    date: "2022-10-07T17:17:15Z",
    comments: "4",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+98 ",
    linesRemoved: "−73 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/52977",
    name: "Merchant App | Updating Returns View on Return Activation",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/52977"";""Merchant App | Updating Returns View on Return Activation"")',
    date: "2022-10-05T22:39:59Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+262 ",
    linesRemoved: "−714 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/53128",
    name: "Merchant App | Added Returns No Returns State Page Component",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/53128"";""Merchant App | Added Returns No Returns State Page Component"")',
    date: "2022-10-04T20:58:13Z",
    comments: "8",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+408 ",
    linesRemoved: "−6 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/53157",
    name: "Merchant App | Adding New Cleaned Up Return Processing Context",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/53157"";""Merchant App | Adding New Cleaned Up Return Processing Context"")',
    date: "2022-10-04T19:17:45Z",
    comments: "3",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+97 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/53124",
    name: "Merchant App | Added Returns Banner Component",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/53124"";""Merchant App | Added Returns Banner Component"")',
    date: "2022-10-04T18:43:40Z",
    comments: "4",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+175 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2171",
    name: "FE Work for Adding Toggle Changes to Subject Changes Table",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2171"";""FE Work for Adding Toggle Changes to Subject Changes Table"")',
    date: "2022-09-28T18:33:52Z",
    comments: "12",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+297 ",
    linesRemoved: "−163 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/52518",
    name: "BE | Fixed Logic for Getting total_count Value",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/52518"";""BE | Fixed Logic for Getting total_count Value"")',
    date: "2022-09-27T00:00:53Z",
    comments: "6",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+21 ",
    linesRemoved: "−1 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2198",
    name: "Fixed Bug in last_rollout_state",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2198"";""Fixed Bug in last_rollout_state"")',
    date: "2022-09-26T19:55:54Z",
    comments: "5",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+25 ",
    linesRemoved: "−4 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2193",
    name: "BE Work for Adding Toggle Changes to Subject Changes Page",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2193"";""BE Work for Adding Toggle Changes to Subject Changes Page"")',
    date: "2022-09-26T15:25:22Z",
    comments: "1",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+308 ",
    linesRemoved: "−77 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2165",
    name: "adding the button for full details url",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2165"";""adding the button for full details url"")',
    date: "2022-09-15T13:41:18Z",
    comments: "6",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+16 ",
    linesRemoved: "−2 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2125",
    name: "Merge Changes and Toggle Timelines",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2125"";""Merge Changes and Toggle Timelines"")',
    date: "2022-09-13T19:37:30Z",
    comments: "6",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+362 ",
    linesRemoved: "−108 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/51203",
    name: "BE | Adding Exclude Variants by ID Filter",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/51203"";""BE | Adding Exclude Variants by ID Filter"")',
    date: "2022-09-06T15:26:08Z",
    comments: "12",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+31 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2097",
    name: "UI for toggle changes details page",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2097"";""UI for toggle changes details page"")',
    date: "2022-08-26T21:42:52Z",
    comments: "18",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+363 ",
    linesRemoved: "−331 ",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2115",
    name: "Adding css and converting class into functional components",
    title:
      '=HYPERLINK(""https://github.com/Shopify/beta-buddy/pull/2115"";""Adding css and converting class into functional components"")',
    date: "2022-08-26T18:00:29Z",
    comments: "13",
    repo: "Shopify/beta-buddy ",
    merged: "Merged pull request",
    linesAdded: "+515 ",
    linesRemoved: "−365 ",
  },
  {
    link: "https://github.com/Shopify/sfn-feature-flags/pull/1",
    name: "Hello World",
    title:
      '=HYPERLINK(""https://github.com/Shopify/sfn-feature-flags/pull/1"";""Hello World"")',
    date: "2022-08-12T19:26:25Z",
    repo: "Shopify/sfn-feature-flags ",
    merged: "Merged pull request",
    linesAdded: "+6 ",
    linesRemoved: "−5 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/49481",
    name: "Merchant App | Added VariantSelectorModalBody to Select RLOP Variants",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/49481"";""Merchant App | Added VariantSelectorModalBody to Select RLOP Variants"")',
    date: "2022-08-04T20:01:40Z",
    comments: "19",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+1,021 ",
    linesRemoved: "−58 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/49371",
    name: "Merchant App | SelectedVariantList Updates & Connections & Tests",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/49371"";""Merchant App | SelectedVariantList Updates & Connections & Tests"")',
    date: "2022-08-03T20:14:25Z",
    comments: "41",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+532 ",
    linesRemoved: "−181 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48687",
    name: "Merchant App | Add Selected Variant List Component",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/48687"";""Merchant App | Add Selected Variant List Component"")',
    date: "2022-07-25T21:10:27Z",
    comments: "19",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+470 ",
    linesRemoved: "−2 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48864",
    name: "Merchant App | Add Modal Wrapper for Variant Selector",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/48864"";""Merchant App | Add Modal Wrapper for Variant Selector"")',
    date: "2022-07-24T22:21:54Z",
    comments: "15",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+103 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48584",
    name: "Mico | Fixed bad links & overlong titles in Return Details",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/48584"";""Mico | Fixed bad links & overlong titles in Return Details"")',
    date: "2022-07-19T16:23:34Z",
    comments: "10",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+44 ",
    linesRemoved: "−16 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47885",
    name: "MiCo | Updated Return Details for 'created' Returns",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47885"";""MiCo | Updated Return Details for \'created\' Returns"")',
    date: "2022-07-18T16:14:37Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+341 ",
    linesRemoved: "−36 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47612",
    name: "Shared Utilities | Updated doesImageLoad Paths & Removed Duplicates",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47612"";""Shared Utilities | Updated doesImageLoad Paths & Removed Duplicates"")',
    date: "2022-06-30T18:20:09Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+17 ",
    linesRemoved: "−54 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47466",
    name: "Shared Utilities | Moved loadImage.ts & Added Tests",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47466"";""Shared Utilities | Moved loadImage.ts & Added Tests"")',
    date: "2022-06-30T16:49:26Z",
    comments: "16",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+47 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47239",
    name: "Shared Utilities | Remove unused Locale files",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47239"";""Shared Utilities | Remove unused Locale files"")',
    date: "2022-06-27T17:04:35Z",
    comments: "3",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+0 ",
    linesRemoved: "−76 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47142",
    name: "Shared Utilities | Moved Local Utility to Shared",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47142"";""Shared Utilities | Moved Local Utility to Shared"")',
    date: "2022-06-24T20:51:33Z",
    comments: "7",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+128 ",
    linesRemoved: "−39 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47137",
    name: "Shared Utilities | Update Date Utility Paths",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47137"";""Shared Utilities | Update Date Utility Paths"")',
    date: "2022-06-24T16:26:32Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+17 ",
    linesRemoved: "−197 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47138",
    name: "Shared Utilities | Update All File Utility Paths",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/47138"";""Shared Utilities | Update All File Utility Paths"")',
    date: "2022-06-24T16:26:32Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+3 ",
    linesRemoved: "−38 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46998",
    name: "Shared Utilities | Updated sku Utility Paths",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46998"";""Shared Utilities | Updated sku Utility Paths"")',
    date: "2022-06-23T22:13:29Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+10 ",
    linesRemoved: "−27 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46944",
    name: "Shared Utilities | Moved all Agnostic & Pure File Utils",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46944"";""Shared Utilities | Moved all Agnostic & Pure File Utils"")',
    date: "2022-06-22T22:53:37Z",
    comments: "4",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+42 ",
    linesRemoved: "−1 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46949",
    name: "Shared Utilities | Added SKU Utility and Tests",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46949"";""Shared Utilities | Added SKU Utility and Tests"")',
    date: "2022-06-22T22:53:37Z",
    comments: "4",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+23 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46956",
    name: "Shared Utilities | Moved Agnostic & Pure Date Utilities",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46956"";""Shared Utilities | Moved Agnostic & Pure Date Utilities"")',
    date: "2022-06-22T22:53:37Z",
    comments: "4",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+170 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46771",
    name: "Shared Utilities | Updated holiday.ts Paths",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46771"";""Shared Utilities | Updated holiday.ts Paths"")',
    date: "2022-06-22T22:48:28Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+6 ",
    linesRemoved: "−122 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46672",
    name: "Shared Utilities | Updated gid.ts Paths and Deleted Duplicated Code",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46672"";""Shared Utilities | Updated gid.ts Paths and Deleted Duplicated Code"")',
    date: "2022-06-22T16:18:57Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+333 ",
    linesRemoved: "−770 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46768",
    name: "MiCo | Update Return Table Pip Colours",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46768"";""MiCo | Update Return Table Pip Colours"")',
    date: "2022-06-21T15:58:14Z",
    comments: "4",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+13 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46626",
    name: "Shared Utilities | Add hoiday.ts and Tests to Shared Utilities",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46626"";""Shared Utilities | Add hoiday.ts and Tests to Shared Utilities"")',
    date: "2022-06-17T16:02:10Z",
    comments: "6",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+117 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46344",
    name: "Shared Utilities | Added env.ts file to return current environment",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46344"";""Shared Utilities | Added env.ts file to return current environment"")',
    date: "2022-06-16T16:16:08Z",
    comments: "12",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+245 ",
    linesRemoved: "−32 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46157",
    name: "Shared Utilities | Updated Strings Paths and Removed Duplications",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46157"";""Shared Utilities | Updated Strings Paths and Removed Duplications"")',
    date: "2022-06-14T15:32:56Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+117 ",
    linesRemoved: "−125 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46253",
    name: "Shared Utilities | Remove unused componentNameUtils.ts as Deprecated",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46253"";""Shared Utilities | Remove unused componentNameUtils.ts as Deprecated"")',
    date: "2022-06-13T19:18:36Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+0 ",
    linesRemoved: "−10 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46136",
    name: "Shared Utilities | Added GID Utility",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46136"";""Shared Utilities | Added GID Utility"")',
    date: "2022-06-13T17:32:53Z",
    comments: "15",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+305 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46141",
    name: "Shared Utilities | Updated TimeZone Utility Paths & Removed Duplicates",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46141"";""Shared Utilities | Updated TimeZone Utility Paths & Removed Duplicates"")',
    date: "2022-06-10T17:21:45Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+19 ",
    linesRemoved: "−328 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46048",
    name: "Shared Utilities | Added Strings Utility",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/46048"";""Shared Utilities | Added Strings Utility"")',
    date: "2022-06-10T16:13:37Z",
    comments: "6",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+13 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45979",
    name: "Shared Utilities | isDefined Update Paths and Remove Duplicates",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/45979"";""Shared Utilities | isDefined Update Paths and Remove Duplicates"")',
    date: "2022-06-10T14:03:21Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+61 ",
    linesRemoved: "−138 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45876",
    name: "Shared Utilities | Adding timeZone utility",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/45876"";""Shared Utilities | Adding timeZone utility"")',
    date: "2022-06-09T17:18:04Z",
    comments: "10",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+179 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45847",
    name: "Shared Utilities | Added isDefined shared utility",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/45847"";""Shared Utilities | Added isDefined shared utility"")',
    date: "2022-06-08T17:48:40Z",
    comments: "7",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+35 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45924",
    name: "Shared Utilities | Update File Util Paths & Remove Non-Shared",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/45924"";""Shared Utilities | Update File Util Paths & Remove Non-Shared"")',
    date: "2022-06-08T17:00:38Z",
    comments: "5",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+4 ",
    linesRemoved: "−11 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45776",
    name: "MiCo/Merchant App | Created Shared Utilities Folder",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/45776"";""MiCo/Merchant App | Created Shared Utilities Folder"")',
    date: "2022-06-06T23:03:19Z",
    comments: "10",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+52 ",
    linesRemoved: "−1 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/44510",
    name: "Merchant App | Return Details Mobile Updates",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/44510"";""Merchant App | Return Details Mobile Updates"")',
    date: "2022-05-20T16:20:34Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+246 ",
    linesRemoved: "−8 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43557",
    name: "Merchant App | Return Details Updates",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/43557"";""Merchant App | Return Details Updates"")',
    date: "2022-05-13T22:13:48Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+59 ",
    linesRemoved: "−40 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43857",
    name: "Mico | Show pending returns when search term is used",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/43857"";""Mico | Show pending returns when search term is used"")',
    date: "2022-05-12T20:07:33Z",
    comments: "7",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+20 ",
    linesRemoved: "−5 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43848",
    name: "Include pending returns in search result in Merchant app",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/43848"";""Include pending returns in search result in Merchant app"")',
    date: "2022-05-06T15:00:17Z",
    comments: "3",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+89 ",
    linesRemoved: "−55 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42903",
    name: "MiCo | Return Filters Fix for Search Term and Status Combo",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/42903"";""MiCo | Return Filters Fix for Search Term and Status Combo"")',
    date: "2022-04-28T15:01:39Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+61 ",
    linesRemoved: "−8 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43140",
    name: "MiCo | Show Rejection Reason on Rejected Return Details",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/43140"";""MiCo | Show Rejection Reason on Rejected Return Details"")',
    date: "2022-04-26T20:40:55Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+128 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43028",
    name: "Add Return rejectionReason to Frontend ",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/43028"";""Add Return rejectionReason to Frontend "")',
    date: "2022-04-25T16:22:34Z",
    comments: "2",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+50 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42887",
    name: "MiCo | Return Details Product Clickable Link",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/42887"";""MiCo | Return Details Product Clickable Link"")',
    date: "2022-04-22T20:24:13Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+20 ",
    linesRemoved: "−5 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42872",
    name: "MiCo | Prevent wrap on Return table status column",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/42872"";""MiCo | Prevent wrap on Return table status column"")',
    date: "2022-04-21T17:54:11Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+1 ",
    linesRemoved: "−1 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42628",
    name: "Merchant Ap | Updated statues badges and states",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/42628"";""Merchant Ap | Updated statues badges and states"")',
    date: "2022-04-19T15:12:34Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+48 ",
    linesRemoved: "−53 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41780",
    name: "MiCo | Updating Returns Table Tabs and Status Filters",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/41780"";""MiCo | Updating Returns Table Tabs and Status Filters"")',
    date: "2022-04-18T19:10:09Z",
    comments: "16",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+121 ",
    linesRemoved: "−47 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42078",
    name: "MiCo | Return Table Status Arrived Fix Fix",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/42078"";""MiCo | Return Table Status Arrived Fix Fix"")',
    date: "2022-04-13T20:06:01Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+74 ",
    linesRemoved: "−35 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41973",
    name: "MiCo | Return Table Status Arrived Fix",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/41973"";""MiCo | Return Table Status Arrived Fix"")',
    date: "2022-04-08T17:03:02Z",
    comments: "3",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+37 ",
    linesRemoved: "−27 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41876",
    name: "MiCo | Adding Return Status 'Arrived' Filter Support",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/41876"";""MiCo | Adding Return Status \'Arrived\' Filter Support"")',
    date: "2022-04-07T17:12:56Z",
    comments: "11",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+111 ",
    linesRemoved: "−15 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41675",
    name: "Checking for the FulfillmentService flag enable for the shop settings",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/41675"";""Checking for the FulfillmentService flag enable for the shop settings"")',
    date: "2022-04-05T18:48:48Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+23 ",
    linesRemoved: "−2 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41559",
    name: "Mission Control | Returns Table Updates",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/41559"";""Mission Control | Returns Table Updates"")',
    date: "2022-04-04T19:14:49Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+308 ",
    linesRemoved: "−104 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41140",
    name: "Monorail Events for Preauthorized Returns Threshold Setting | Merchant App",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/41140"";""Monorail Events for Preauthorized Returns Threshold Setting | Merchant App"")',
    date: "2022-04-04T17:20:23Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+100 ",
    linesRemoved: "−1 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39773",
    name: "Return Table UI Changes | Merchant App",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/39773"";""Return Table UI Changes | Merchant App"")',
    date: "2022-03-18T21:38:31Z",
    comments: "30",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+547 ",
    linesRemoved: "−143 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39649",
    name: "Backend work for adding preauthorized filter to returns",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/39649"";""Backend work for adding preauthorized filter to returns"")',
    date: "2022-03-16T00:05:12Z",
    comments: "32",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+129 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39839",
    name: "Add inspectionCompletedAt to Frontend",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/39839"";""Add inspectionCompletedAt to Frontend"")',
    date: "2022-03-14T21:29:43Z",
    comments: "3",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+51 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39493",
    name: "Preauthorized Returns Variable Name Changes",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/39493"";""Preauthorized Returns Variable Name Changes"")',
    date: "2022-03-09T23:00:56Z",
    comments: "3",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+27 ",
    linesRemoved: "−27 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39235",
    name: "Update Preauthorized Return Subtitle & Line Items",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/39235"";""Update Preauthorized Return Subtitle & Line Items"")',
    date: "2022-03-09T18:02:47Z",
    comments: "18",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+468 ",
    linesRemoved: "−102 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/38224",
    name: "Merchant App | Returns Table | Updated column name and status",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/38224"";""Merchant App | Returns Table | Updated column name and status"")',
    date: "2022-02-24T20:10:29Z",
    comments: "1",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+4 ",
    linesRemoved: "−1 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/37990",
    name: "Frontend work for adding Mission Control Inventory Page Return Tab",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/37990"";""Frontend work for adding Mission Control Inventory Page Return Tab"")',
    date: "2022-02-23T21:31:06Z",
    comments: "7",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+182 ",
    linesRemoved: "−15 ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/37947",
    name: "Backend Work for Adding Return Tab to Mission Control Inventory Pages",
    title:
      '=HYPERLINK(""https://github.com/Shopify/fbs/pull/37947"";""Backend Work for Adding Return Tab to Mission Control Inventory Pages"")',
    date: "2022-02-22T16:46:27Z",
    comments: "7",
    repo: "Shopify/fbs ",
    merged: "Merged pull request",
    linesAdded: "+113 ",
    linesRemoved: "−0 ",
  },
  {
    link: "https://github.com/Shopify/shipping-to-production/pull/3179",
    name: "Kevin Cox Changed 'spotify' to 'shopify' and updated the image src to show correct…",
    title:
      '=HYPERLINK(""https://github.com/Shopify/shipping-to-production/pull/3179"";""Kevin Cox Changed \'spotify\' to \'shopify\' and updated the image src to show correct…"")',
    date: "2022-01-14T18:40:08Z",
    comments: "13",
    repo: "Shopify/shipping-to-production ",
    merged: "Merged pull request",
    linesAdded: "+114 ",
    linesRemoved: "−2 ",
  },
];
