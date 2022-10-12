import { SelectOption, BoolOrBoth } from "types";
import { Select, TextField } from "@/components/ui";
import styles from "./home.module.scss";

export const CSVHeaders = [
  { key: "title", label: "Pull Request Name | Link" },
  { key: "date", label: "Date" },
  { key: "linesAdded", label: "Lines +" },
  { key: "linesRemoved", label: "Lines -" },
  { key: "comments", label: "Comments" },
  { key: "repo", label: "Repo" },
];

export const prStateOptions: SelectOption[] = [
  { label: "All", value: BoolOrBoth.Both },
  { label: "Open", value: BoolOrBoth.True },
  { label: "Closed", value: BoolOrBoth.False },
];

export const prStatusOptions: SelectOption[] = [
  { label: "Merged", value: BoolOrBoth.True },
  { label: "Closed", value: BoolOrBoth.False },
  { label: "All", value: BoolOrBoth.Both },
];

export const prAssignedOptions: SelectOption[] = [
  { label: "Created", value: BoolOrBoth.True },
  { label: "Assigned", value: BoolOrBoth.False },
  { label: "Created & Assigned", value: BoolOrBoth.Both },
];

export const scrapeTypeOptions: SelectOption[] = [
  { label: "Pull requests", value: "prs" },
  { label: "Reviews", value: "reviews", disabled: true },
];

const getGitscrapeFilter = (
  title: string,
  text: string,
  name: string,
  onChange: (val: Object) => void,
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
        onChange={(val: string) => onChange({ [name]: val })}
      />
    )}
    {!options && (
      <TextField
        name={name}
        type="text"
        value={value}
        onChange={(val: string) => onChange({ [name]: val })}
      />
    )}
  </>
);

export const renderScrapeTypeFilter = (
  onChange: (value: object) => void,
  filters: any
) => {
  return getGitscrapeFilter(
    "Scrape type",
    "Choose whether you want to scrape a users pull requests or their reviews.",
    "scrapeType",
    onChange,
    filters.scrapeType,
    scrapeTypeOptions
  );
};

export const renderScrapeAuthorFilter = (
  onChange: (value: object) => void,
  filters: any
) => {
  return getGitscrapeFilter(
    "Github author",
    "Enter the github username of the author you want to scrape for.",
    "author",
    onChange,
    filters.author
  );
};

export const renderScrapeOpenFilter = (
  onChange: (value: object) => void,
  filters: any
) => {
  return (
    filters.author &&
    getGitscrapeFilter(
      "Open, closed or all",
      "Choose whether you want to scrape open, closed or all pull requests.",
      "open",
      onChange,
      filters.open,
      prStateOptions
    )
  );
};

export const renderScrapeMergeFilter = (
  onChange: (value: object) => void,
  filters: any
) => {
  return (
    filters.author &&
    filters.open != BoolOrBoth.True &&
    getGitscrapeFilter(
      "Merged, closed or all",
      "Choose whether you want to scrape merged, closed or all unopen pull requests.",
      "merged",
      onChange,
      filters.merged,
      prStatusOptions
    )
  );
};

export const renderScrapeAssignedFilter = (
  onChange: (value: object) => void,
  filters: any
) => {
  return (
    filters.author &&
    getGitscrapeFilter(
      "Created, Assigned, or both",
      "Choose whether you want to scrape PRs associated to the author(s) as creators, assignees or both.",
      "assigned",
      onChange,
      filters.assigned,
      prAssignedOptions
    )
  );
};
