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
  renderScrapeTypeFilter,
  renderScrapeAuthorFilter,
  renderScrapeOpenFilter,
  renderScrapeMergeFilter,
  renderScrapeAssignedFilter,
  CSVHeaders,
} from "./helpers";

export const Home: NextPage = () => {
  const [PRData, setPRData] = useState<any>();
  const [filters, setFilters] = useState<PRFilters>({} as PRFilters);
  const updateFilters = (changes: Object) =>
    setFilters({ ...filters, ...changes });

  const setDefaults = () => {
    updateFilters({
      scrapeType: config.DEFAULT_SCRAPETYPE,
      merged: config.DEFAULT_MERGED,
      open: config.DEFAULT_OPEN,
      author: config.DEFAULT_AUTHOR,
      assigned: config.DEFAULT_ASSIGNED,
    });
  };

  const getPRData = async () => {
    const response = await fetch("/api/gitscrape/gitscrape", {
      method: "POST",
      body: JSON.stringify({ filters: filters }),
      headers: { "Content-Type": "application/json" },
    });
    const allPRData = await response.json();
    setPRData(allPRData.data);
    console.log(allPRData.data);
  };

  const scrapeButtonEnabled = Boolean(
    filters.assigned &&
      filters.author &&
      filters.open &&
      filters.merged &&
      filters.scrapeType
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
              onClick={setDefaults}
            >
              Use Defaults
            </Button>
          </div>
          <div className={styles.gitConfig__content}>
            {renderScrapeTypeFilter(updateFilters, filters)}
            {renderScrapeAuthorFilter(updateFilters, filters)}
            {renderScrapeOpenFilter(updateFilters, filters)}
            {renderScrapeMergeFilter(updateFilters, filters)}
            {renderScrapeAssignedFilter(updateFilters, filters)}
            <div className={styles.scrape__button}>
              <Button
                disabled={!scrapeButtonEnabled}
                background={"#0c7760"}
                title="Get PR Details"
                onClick={getPRData}
              >
                Get PR Details
              </Button>
            </div>
            <div className={styles.scrape__button}>
              <Button background={"#0c7760"} title="Download CSV PRs">
                <CSVLink
                  data={PRData?.PRDetails ?? []}
                  headers={CSVHeaders}
                  target="_blank"
                  className={styles.csvLink}
                  filename={"PRHistory.csv"}
                  separator={","}
                >
                  Download PR Details as CSV
                </CSVLink>
              </Button>
            </div>
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
