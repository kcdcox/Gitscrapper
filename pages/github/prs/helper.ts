import { SelectOption, BoolOrBoth } from "types";

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
