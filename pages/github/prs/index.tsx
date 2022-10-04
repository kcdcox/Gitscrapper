import { useEffect, useState } from "react";
import { NextPage } from "next";

import {
  PRFilters,
  PRequestData,
  SelectOption,
  BoolOrBoth,
  ColJust,
} from "types";
import { TextField, Button, Select, DataTable } from "components/ui";

const DUMMY_DATA = [
  {
    link: "https://github.com/Shopify/fbs/pull/52518",
    repo: "Shopify/fbs ",
    prTitlerow: "BE | Fixed Logic for Getting total_count Value",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2198",
    repo: "Shopify/beta-buddy ",
    prTitlerow: "Fixed Bug in last_rollout_state",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2193",
    repo: "Shopify/beta-buddy ",
    prTitlerow: "BE Work for Adding Toggle Changes to Subject Changes Page",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2192",
    repo: "Shopify/beta-buddy ",
    prTitlerow: "Back end work for rollout table toggle changes",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2171",
    repo: "Shopify/beta-buddy ",
    prTitlerow: "FE Work for Adding Toggle Changes to Subject Changes Table",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/51203",
    repo: "Shopify/fbs ",
    prTitlerow: "BE | Adding Exclude Variants by ID Filter",
  },
  {
    link: "https://github.com/Shopify/beta-buddy/pull/2125",
    repo: "Shopify/beta-buddy ",
    prTitlerow: "Merge Changes and Toggle Timelines",
  },
  {
    link: "https://github.com/Shopify/sfn-feature-flags/pull/1",
    repo: "Shopify/sfn-feature-flags ",
    prTitlerow: "Hello World",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/49543",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Variant Selection for RLOP Feature",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/49481",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Merchant App | Added VariantSelectorModalBody to Select RLOP Variants",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/49371",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Merchant App | SelectedVariantList Updates & Connections & Tests",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48967",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Merchant App | Returns Settings | Adding Variant Selector Modal Body",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48864",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Add Modal Wrapper for Variant Selector",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48687",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Add Selected Variant List Component",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48584",
    repo: "Shopify/fbs ",
    prTitlerow: "Mico | Fixed bad links & overlong titles in Return Details",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/48557",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Adding toggles variant list component",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47885",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Updated Return Details for 'created' Returns",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47612",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Updated doesImageLoad Paths & Removed Duplicates",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47466",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Moved loadImage.ts & Added Tests",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47239",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Remove unused Locale files",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47142",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Moved Local Utility to Shared",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47138",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Update All File Utility Paths",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/47137",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Update Date Utility Paths",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46998",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Updated sku Utility Paths",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46956",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Moved Agnostic & Pure Date Utilities",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46949",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Added SKU Utility and Tests",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46944",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Moved all Agnostic & Pure File Utils",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46771",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Updated holiday.ts Paths",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46770",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Moved helpUrl.ts Utilities to Shared Folder",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46768",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Update Return Table Pip Colours",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46672",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Updated gid.ts Paths and Deleted Duplicated Code",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46626",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Add hoiday.ts and Tests to Shared Utilities",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46344",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Added env.ts file to return current environment",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46253",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Remove unused componentNameUtils.ts as Deprecated",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46157",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Updated Strings Paths and Removed Duplications",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46141",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | Updated TimeZone Utility Paths & Removed Duplicates",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46136",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Added GID Utility",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46072",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Adding Bugsnag Utility",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/46048",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Added Strings Utility",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45979",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Shared Utilities | isDefined Update Paths and Remove Duplicates",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45924",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Update File Util Paths & Remove Non-Shared",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45876",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Adding timeZone utility",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45847",
    repo: "Shopify/fbs ",
    prTitlerow: "Shared Utilities | Added isDefined shared utility",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/45776",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo/Merchant App | Created Shared Utilities Folder",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/44510",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Return Details Mobile Updates",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43857",
    repo: "Shopify/fbs ",
    prTitlerow: "Mico | Show pending returns when search term is used",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43557",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Return Details Updates",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43140",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Show Rejection Reason on Rejected Return Details",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43028",
    repo: "Shopify/fbs ",
    prTitlerow: "Add Return rejectionReason to Frontend ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43027",
    repo: "Shopify/fbs ",
    prTitlerow: "Add Return rejectionReason to Frontend",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/43012",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Add Return Rejection Message to Return Details",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42903",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Return Filters Fix for Search Term and Status Combo",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42887",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Return Details Product Clickable Link",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42872",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Prevent wrap on Return table status column",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42628",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant Ap | Updated statues badges and states",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42387",
    repo: "Shopify/fbs ",
    prTitlerow: "Updated statues badges and states",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/42078",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Return Table Status Arrived Fix Fix",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41973",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Return Table Status Arrived Fix",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41876",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Adding Return Status 'Arrived' Filter Support",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41780",
    repo: "Shopify/fbs ",
    prTitlerow: "MiCo | Updating Returns Table Tabs and Status Filters",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41559",
    repo: "Shopify/fbs ",
    prTitlerow: "Mission Control | Returns Table Updates",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/41140",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Monorail Events for Preauthorized Returns Threshold Setting | Merchant App",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39839",
    repo: "Shopify/fbs ",
    prTitlerow: "Add inspectionCompletedAt to Frontend",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39773",
    repo: "Shopify/fbs ",
    prTitlerow: "Return Table UI Changes | Merchant App",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39649",
    repo: "Shopify/fbs ",
    prTitlerow: "Backend work for adding preauthorized filter to returns",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39493",
    repo: "Shopify/fbs ",
    prTitlerow: "Preauthorized Returns Variable Name Changes",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39447",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Return Table UI Changes",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39403",
    repo: "Shopify/fbs ",
    prTitlerow: "Returbn Table Ui Changes",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39287",
    repo: "Shopify/fbs ",
    prTitlerow: "Return Table UI Changes | Merchant App ",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39235",
    repo: "Shopify/fbs ",
    prTitlerow: "Update Preauthorized Return Subtitle & Line Items",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/39217",
    repo: "Shopify/fbs ",
    prTitlerow: "Kcdcox/ma update preauth return line items 2",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/38775",
    repo: "Shopify/fbs ",
    prTitlerow: "Returns table UI changes",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/38742",
    repo: "Shopify/fbs ",
    prTitlerow: "Update Preauthorized Return Subtitle & Line Items",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/38440",
    repo: "Shopify/fbs ",
    prTitlerow: "Updated Preauthorized Return View for Single and Multi Items",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/38224",
    repo: "Shopify/fbs ",
    prTitlerow: "Merchant App | Returns Table | Updated column name and status",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/37990",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Frontend work for adding Mission Control Inventory Page Return Tab",
  },
  {
    link: "https://github.com/Shopify/fbs/pull/37947",
    repo: "Shopify/fbs ",
    prTitlerow:
      "Backend Work for Adding Return Tab to Mission Control Inventory Pages",
  },
  {
    link: "https://github.com/Shopify/shipping-to-production/pull/3179",
    repo: "Shopify/shipping-to-production ",
    prTitlerow:
      "Kevin Cox Changed 'spotify' to 'shopify' and updated the image src to show correct…",
  },
];

import styles from "./prs.module.scss";

export const Github: NextPage = () => {
  const [allPRs, setAllPRs] = useState([]);
  const [scrapeFilters, setScrapeFilters] = useState<PRFilters>(
    {} as PRFilters
  );
  const [scrapeData, setScrapeData] = useState<PRequestData>(
    {} as PRequestData
  );

  const updateScrapeFilters = (changes: Object) => {
    setScrapeFilters({ ...scrapeFilters, ...changes });
  };

  const updateScrapeData = (key: string, value: string) => {
    setScrapeData({ ...scrapeData, [key]: value });
  };

  useEffect(() => {
    updateScrapeFilters({ scrapeType: "prs", merged: "true", open: "false" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(scrapeFilters);

  const getAllPRs = async () => {
    const response = await fetch("/api/github/get-all-prs", {
      method: "POST",
      body: JSON.stringify({
        filters: scrapeFilters,
        details: scrapeData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAllPRs(data.allPRLinks);
    console.log(data);
  };

  const showScrapperButton =
    scrapeFilters.author && scrapeFilters.open && scrapeFilters.merged;

  const renderGitScrapperButton = showScrapperButton && (
    <div className={styles.scrape__button}>
      <Button
        background={"#0c7760"}
        title="Get PR Details"
        onClick={getAllPRs}
      />
    </div>
  );

  // const renderDataOptions = <div className={styles.filters_container}></div>;

  const renderSectionDescription = (title: string, description: string) => (
    <div className={styles.section__description}>
      <h2 className={styles.description__title}>{title}</h2>
      <p className={styles.description__description}>{description}</p>
    </div>
  );

  const scrapeTypeOptions: SelectOption[] = [
    { label: "Pull requests", value: "prs" },
    { label: "Reviews", value: "reviews", disabled: true },
  ];

  const renderScrapeTypeFilter = (
    <>
      {renderSectionDescription(
        "Scrape type",
        "Choose whether you want to scrape a users pull requests or their reviews."
      )}
      <Select
        name="scrapeTypeFilter"
        value={scrapeFilters.scrapeType}
        options={scrapeTypeOptions}
        onChange={(value: string) => updateScrapeFilters({ scrapeType: value })}
      />
    </>
  );

  const renderScrapeAuthorFilter = (
    <>
      {renderSectionDescription(
        "Github author",
        "Enter the github username of the author you want to scrape for."
      )}
      <TextField
        name="author"
        type="text"
        onChange={(value: string) => updateScrapeFilters({ author: value })}
      />
    </>
  );

  const prStateOptions: SelectOption[] = [
    { label: "All", value: BoolOrBoth.Both },
    { label: "Open", value: BoolOrBoth.True },
    { label: "Closed", value: BoolOrBoth.False },
  ];

  const renderScrapeOpenFilter = scrapeFilters.author && (
    <>
      {renderSectionDescription(
        "Open, closed or all",
        "Choose whether you want to scrape open, closed or all pull requests."
      )}
      <Select
        name="prStateFilter"
        options={prStateOptions}
        value={scrapeFilters.open}
        onChange={(value: string) => updateScrapeFilters({ open: value })}
      />
    </>
  );

  const prStatusOptions: SelectOption[] = [
    { label: "Merged", value: BoolOrBoth.True },
    { label: "Closed", value: BoolOrBoth.False },
    { label: "All", value: BoolOrBoth.Both },
  ];

  const renderScrapeMergeFilter = scrapeFilters.author &&
    scrapeFilters.open != BoolOrBoth.True && (
      <>
        {renderSectionDescription(
          "Merged, closed or all",
          "Choose whether you want to scrape merged, closed or all unopen pull requests."
        )}
        <Select
          name="prStatusFilter"
          options={prStatusOptions}
          value={scrapeFilters.merged}
          onChange={(value: string) => updateScrapeFilters({ merged: value })}
        />
      </>
    );

  const renderDataTable = () => {
    const rows = allPRs?.map((pr: any) => {
      return [pr.link, pr.prTitlerow, pr.repo];
    });

    return (
      <DataTable
        colJust={[ColJust.Left, ColJust.Center, ColJust.Left]}
        headings={["Link", "Title", "Repository"]}
        rows={rows ?? []}
      />
    );
  };

  console.log(allPRs);

  return (
    <div className={styles.git}>
      <div className={styles.content__header}>
        <h1 className={styles.content__title}>Gitscrape Configuration</h1>
      </div>
      <div className={styles.git__content}>
        {renderScrapeTypeFilter}
        {renderScrapeAuthorFilter}
        {renderScrapeOpenFilter}
        {renderScrapeMergeFilter}
        {renderGitScrapperButton}
        {renderDataTable()}
      </div>
    </div>
  );
};

export default Github;
