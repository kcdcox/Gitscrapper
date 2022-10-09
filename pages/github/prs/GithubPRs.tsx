import { useEffect, useState } from "react";
import { NextPage } from "next";
import { CSVLink } from "react-csv";
import { PRFilters, BoolOrBoth, ColJust, SelectOption } from "types";
import { TextField, Button, Select, DataTable } from "components/ui";
import {
  prStateOptions,
  prStatusOptions,
  prAssignedOptions,
  scrapeTypeOptions,
} from "./helper";

import styles from "./prs.module.scss";

export const GithubPRs: NextPage = () => {
  const [allPRs, setAllPRs] = useState([]);
  const [scrapeFilters, setScrapeFilters] = useState<PRFilters>(
    {} as PRFilters
  );

  const updateScrapeFilters = (changes: Object) => {
    setScrapeFilters({ ...scrapeFilters, ...changes });
  };

  // const [scrapeData, setScrapeData] = useState<PRequestData>(
  //   {} as PRequestData
  // );
  // const updateScrapeData = (key: string, value: string) => {
  //   setScrapeData({ ...scrapeData, [key]: value });
  // };

  useEffect(() => {
    updateScrapeFilters({
      scrapeType: "prs",
      merged: "true",
      open: "false",
      assigned: "both",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllPRs = async () => {
    const response = await fetch("/api/github/get-all-prs", {
      method: "POST",
      body: JSON.stringify({
        filters: scrapeFilters,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAllPRs(data.PRDetails);
    console.log(data);
  };

  const showScrapperButton =
    scrapeFilters.author && scrapeFilters.open && scrapeFilters.merged;

  const renderGitScrapperButton = showScrapperButton && (
    <div className={styles.scrape__button}>
      <Button background={"#0c7760"} title="Get PR Details" onClick={getAllPRs}>
        Get PR Details
      </Button>
    </div>
  );

  const renderSelectScrapeFilter = (
    title: string,
    text: string,
    name: string,
    value?: any,
    options?: SelectOption[]
  ) => (
    <>
      <div className={styles.section__description}>
        <h2 className={styles.description__title}>{title}</h2>
        <p className={styles.description__description}>{text}</p>
      </div>
      {options && (
        <Select
          name={name}
          value={value}
          options={options}
          onChange={(val: string) => updateScrapeFilters({ [name]: val })}
        />
      )}
      {!options && (
        <TextField
          name={name}
          type="text"
          onChange={(val: string) => updateScrapeFilters({ [name]: val })}
        />
      )}
    </>
  );

  const renderScrapeTypeFilter = renderSelectScrapeFilter(
    "Scrape type",
    "Choose whether you want to scrape a users pull requests or their reviews.",
    "scrapeType",
    scrapeFilters.scrapeType,
    scrapeTypeOptions
  );

  const renderScrapeAuthorFilter = renderSelectScrapeFilter(
    "Github author",
    "Enter the github username of the author you want to scrape for.",
    "author"
  );

  const renderScrapeOpenFilter =
    scrapeFilters.author &&
    renderSelectScrapeFilter(
      "Open, closed or all",
      "Choose whether you want to scrape open, closed or all pull requests.",
      "open",
      scrapeFilters.open,
      prStateOptions
    );

  const renderScrapeMergeFilter =
    scrapeFilters.author &&
    scrapeFilters.open != BoolOrBoth.True &&
    renderSelectScrapeFilter(
      "Merged, closed or all",
      "Choose whether you want to scrape merged, closed or all unopen pull requests.",
      "merged",
      scrapeFilters.merged,
      prStatusOptions
    );

  const renderScrapeAssignedFilter =
    scrapeFilters.author &&
    renderSelectScrapeFilter(
      "Created, Assigned, or both",
      "Choose whether you want to scrape PRs associated to the author(s) as creators, assignees or both.",
      "assigned",
      scrapeFilters.assigned,
      prAssignedOptions
    );

  const renderDataTable = () => {
    const rows = allPRs?.map((pr: any) => {
      return [pr.link, pr.title, pr.repo];
    });

    return (
      rows?.length > 0 && (
        <DataTable
          colJust={[ColJust.Left, ColJust.Center, ColJust.Left]}
          headings={["Link", "Title", "Repository"]}
          rows={rows ?? []}
        />
      )
    );
  };

  const renderTitle = (
    <div className={styles.content__header}>
      <h1 className={styles.content__title}>Gitscrape Configuration</h1>
    </div>
  );

  const headers = [
    { key: "title", label: "Pull Request Name | Link" },
    { key: "date", label: "Date" },
    { key: "linesAdded", label: "Lines +" },
    { key: "linesRemoved", label: "Lines -" },
    { key: "comments", label: "Comments" },
    { key: "repo", label: "Repo" },
  ];

  const renderDownloadCSVButton = allPRs?.length > 0 && (
    <div className={styles.scrape__button}>
      <CSVLink data={allPRs} headers={headers}>
        <Button background={"#0c7760"} title="Download CSV PRs">
          Download PR Details as CSV
        </Button>
      </CSVLink>
    </div>
  );

  return (
    <div className={styles.git}>
      {renderTitle}
      <div className={styles.git__content}>
        {renderScrapeTypeFilter}
        {renderScrapeAuthorFilter}
        {renderScrapeOpenFilter}
        {renderScrapeMergeFilter}
        {renderScrapeAssignedFilter}
        {renderGitScrapperButton}
        {renderDownloadCSVButton}
        {renderDataTable()}
      </div>
    </div>
  );
};

export default GithubPRs;
