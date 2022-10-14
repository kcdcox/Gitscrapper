import { SelectOption, BoolOrBoth } from "types";
import moment from "moment";
import { TextField, MultiSelectButton } from "components/ui";
import styles from "./home.module.scss";

export const CSVHeaders = [
  { key: "title", label: "Pull Request Name | Link" },
  { key: "date", label: "Date" },
  { key: "linesAdded", label: "Lines +" },
  { key: "linesRemoved", label: "Lines -" },
  { key: "comments", label: "Comments" },
  { key: "repo", label: "Repo" },
];

export const prOpenOptions: SelectOption[] = [
  { label: "Open", value: BoolOrBoth.True },
  { label: "Closed", value: BoolOrBoth.False },
  { label: "All", value: BoolOrBoth.Both },
];

export const prStatusOptions: SelectOption[] = [
  { label: "Merged", value: BoolOrBoth.True },
  { label: "Closed", value: BoolOrBoth.False },
  { label: "All", value: BoolOrBoth.Both },
];

export const prAssignedOptions: SelectOption[] = [
  { label: "Created", value: BoolOrBoth.True },
  { label: "Assigned", value: BoolOrBoth.False },
  { label: "All", value: BoolOrBoth.Both },
];

export const scrapeTypeOptions: SelectOption[] = [
  { label: "Pull requests", value: "prs" },
  { label: "Reviews", value: "reviews", disabled: true },
];

export const cleanUpCSVData = (PRs: any) => {
  const format = "MMM/DD/YYYY";
  if (Array.isArray(PRs) && PRs.length > 0) {
    return PRs.reverse().map((pr: any) => {
      return {
        ...pr,
        linesAdded: parseInt(pr.linesAdded?.slice(1).trim()),
        linesRemoved: parseInt(pr.linesRemoved?.slice(1).trim()),
        date: moment(pr.date).format(format),
      };
    });
  }
  return [];
};

const getGitscrapeFilter = (
  title: string,
  text: string,
  name: string,
  onChange: (val: Object) => void,
  value?: any,
  options?: SelectOption[]
) => (
  <div className={styles.option__section}>
    <div className={styles.section__description}>
      <h2 className={styles.description__title}>{title}</h2>
      <p className={styles.description__description}>{text}</p>
    </div>
    {options && (
      <MultiSelectButton
        name={name}
        size="small"
        value={value}
        labels={options}
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
  </div>
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
    "Enter your github username for authentication.",
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
      "Scrape open, closed or all PRs.",
      "open",
      onChange,
      filters.open,
      prOpenOptions
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
      "Scrape merged, closed or all un-open PRs.",
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
      "Created, assigned, or all",
      "Scrape authored, assigned, or all PRs.",
      "assigned",
      onChange,
      filters.assigned,
      prAssignedOptions
    )
  );
};
