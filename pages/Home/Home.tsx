import { useState } from "react";
import { NextPage } from "next";
import { CSVLink } from "components/ui/CSVLink";
import { PRFilters } from "types";
import { PRsTable } from "./components/PRsTable";
import { Button } from "@/components/ui";
import { LinesChangedGraph } from "./components/LinesChangedGraph";
import config from "config/default-gitscrape-config.json";
import styles from "./home.module.scss";
import {
  renderScrapeAuthorFilter,
  renderScrapeOpenFilter,
  renderScrapeMergeFilter,
  renderScrapeTypeFilter,
  renderScrapeAssignedFilter,
  cleanUpCSVData,
  CSVHeaders,
} from "./helpers";

export const Home: NextPage = () => {
  const [PRData, setPRData] = useState<any>();
  const [filters, setFilters] = useState<PRFilters>(config as PRFilters);
  const updateFilters = (changes: Object) =>
    setFilters({ ...filters, ...changes });

  const getPRData = async () => {
    const url = `/api/gitscrape/${
      filters.type == "prs" ? "pullRequests" : "reviews"
    }`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ filters: filters }),
      headers: { "Content-Type": "application/json" },
    });
    const allPRData = await response.json();
    setPRData(allPRData.data);
    console.log(allPRData.data);
  };

  const scrapeButtonEnabled = Boolean(
    filters.assigned && filters.author && filters.open && filters.merged
  );

  const showLinesChangedGraph =
    Array.isArray(PRData?.linesChangedGraphData.biMonthlyData) &&
    Array.isArray(PRData?.linesChangedGraphData.monthlyData);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.gitConfig}>
          <div className={styles.gitConfig__header}>
            <h1 className={styles.gitConfig__title}>Gitscrape Configuration</h1>
            <Button
              background={"#0c7760"}
              title="UseDefaults"
              onClick={() => setFilters(config as PRFilters)}
            >
              Use Defaults
            </Button>
          </div>
          <div className={styles.gitConfig__content}>
            {renderScrapeAuthorFilter(updateFilters, filters)}
            {renderScrapeTypeFilter(updateFilters, filters)}
            {renderScrapeOpenFilter(updateFilters, filters)}
            {renderScrapeMergeFilter(updateFilters, filters)}
            {renderScrapeAssignedFilter(updateFilters, filters)}
          </div>
          <div className={styles.gitConfig__footer}>
            <Button
              disabled={!scrapeButtonEnabled}
              title="Get PR Details"
              onClick={getPRData}
            >
              Get PR Details
            </Button>
            {PRData && (
              <Button title="Download CSV PRs">
                <CSVLink
                  data={cleanUpCSVData(PRData?.PRDetails)}
                  headers={CSVHeaders}
                  target="_blank"
                  className={styles.csvLink}
                  filename={"PRHistory.csv"}
                  separator={","}
                >
                  Download PR Details as CSV
                </CSVLink>
              </Button>
            )}
          </div>
        </div>
        <div className={styles.stats}>
          {showLinesChangedGraph && (
            <LinesChangedGraph data={PRData?.linesChangedGraphData} />
          )}
          <PRsTable PRs={PRData?.PRDetails ?? []} />
        </div>
      </div>
      <div className={styles.home__background} />
    </>
  );
};

export default Home;
